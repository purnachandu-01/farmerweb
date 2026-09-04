"""
Farm2Fair — Unified Full-Stack Server
Combines Flask REST Backend and Static Frontend SPA
Smart India Hackathon 2026
"""

from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import os
import json
import uuid

from backend.db import init_db, get_db
from backend.ai_engine import predict_fair_price, evaluate_storage_advice

# Root directory of the application
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

# Initialize database schema and initial seed data
init_db()

# --------------------------------------------------------------------------
# Frontend Static Files Serving
# --------------------------------------------------------------------------

@app.route('/')
def index():
    return send_file(os.path.join(BASE_DIR, 'index.html'))

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'css'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'js'), filename)


# --------------------------------------------------------------------------
# Authentication APIs
# --------------------------------------------------------------------------

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.get_json() or {}
    identifier = data.get('identifier', '').strip()
    role = data.get('role', 'farmer')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ? OR phone LIKE ?', (identifier, f"%{identifier}%"))
    row = cursor.fetchone()
    conn.close()

    if row:
        user = dict(row)
    else:
        user = {
            'id': f'usr-{uuid.uuid4().hex[:6]}',
            'name': identifier.split('@')[0].title() if '@' in identifier else 'Demo User',
            'role': role,
            'email': identifier if '@' in identifier else f"{identifier}@farm2fair.in",
            'phone': identifier if '@' not in identifier else '+91 98000 00000',
            'location': 'Bengaluru Rural, Karnataka',
            'rating': 4.9
        }

    return jsonify({'success': True, 'user': user})

@app.route('/api/auth/register', methods=['POST'])
def api_register():
    data = request.get_json() or {}
    user_id = f"usr-{uuid.uuid4().hex[:6]}"
    name = data.get('name', 'New Member')
    role = data.get('role', 'farmer')
    email = data.get('email', f"{user_id}@farm2fair.in")
    phone = data.get('phone', '+91 90000 00000')
    location = data.get('location', 'Karnataka')

    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            'INSERT INTO users (id, name, role, email, phone, location) VALUES (?,?,?,?,?,?)',
            (user_id, name, role, email, phone, location)
        )
        conn.commit()
    except Exception as e:
        pass
    conn.close()

    return jsonify({
        'success': True,
        'user': {'id': user_id, 'name': name, 'role': role, 'email': email, 'phone': phone, 'location': location}
    })


# --------------------------------------------------------------------------
# Crop Listings APIs
# --------------------------------------------------------------------------

@app.route('/api/crops', methods=['GET'])
def api_get_crops():
    category = request.args.get('category')
    search = request.args.get('search')
    max_price = request.args.get('maxPrice')

    conn = get_db()
    cursor = conn.cursor()

    query = 'SELECT * FROM crops WHERE status = "active"'
    params = []

    if category and category != 'All':
        query += ' AND LOWER(category) = LOWER(?)'
        params.append(category)

    if search:
        query += ' AND (LOWER(crop) LIKE LOWER(?) OR LOWER(farmer_location) LIKE LOWER(?))'
        params.extend([f"%{search}%", f"%{search}%"])

    if max_price:
        try:
            query += ' AND farmer_price <= ?'
            params.append(float(max_price))
        except ValueError:
            pass

    query += ' ORDER BY created_at DESC'
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        d = dict(r)
        # Format keys for frontend compatibility
        results.append({
            'id': d['id'],
            'farmerId': d['farmer_id'],
            'farmerName': d['farmer_name'],
            'farmerLocation': d['farmer_location'],
            'crop': d['crop'],
            'category': d['category'],
            'quantity': d['quantity'],
            'unit': d['unit'],
            'quality': d['quality'],
            'farmerPrice': d['farmer_price'],
            'aiSuggestedMin': d['ai_suggested_min'],
            'aiSuggestedMax': d['ai_suggested_max'],
            'harvestDate': d['harvest_date'],
            'distanceKm': d['distance_km'],
            'shelfLifeDays': d['shelf_life_days'],
            'image': d['image'],
            'status': d['status'],
            'description': d['description']
        })

    return jsonify(results)

@app.route('/api/crops', methods=['POST'])
def api_create_crop():
    data = request.get_json() or {}
    crop_id = f"crop-{uuid.uuid4().hex[:6]}"
    farmer_id = data.get('farmerId', 'usr-f-1')
    farmer_name = data.get('farmerName', 'Ramesh Patel')
    farmer_location = data.get('location', 'Kolar, Karnataka')
    crop = data.get('crop', 'Tomatoes')
    category = data.get('category', 'Vegetables')
    quantity = float(data.get('quantity', 500))
    unit = data.get('unit', 'kg')
    quality = data.get('quality', 'Grade A')
    farmer_price = float(data.get('farmerPrice', 28.0))
    harvest_date = data.get('harvestDate', '2026-09-04')
    image = data.get('image', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80')
    description = data.get('description', 'Directly listed from verified harvest.')

    # Run AI engine to calculate fair corridor automatically
    ai_pred = predict_fair_price(crop, quantity, quality, farmer_location)
    ai_min = ai_pred['suggestedMin']
    ai_max = ai_pred['suggestedMax']

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO crops (id, farmer_id, farmer_name, farmer_location, crop, category, quantity, unit, quality, farmer_price, ai_suggested_min, ai_suggested_max, harvest_date, distance_km, shelf_life_days, image, status, description)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', (crop_id, farmer_id, farmer_name, farmer_location, crop, category, quantity, unit, quality, farmer_price, ai_min, ai_max, harvest_date, 38.0, 10, image, 'active', description))

    # Log to admin activity
    cursor.execute(
        'INSERT INTO admin_activity (time_str, activity_text) VALUES (?, ?)',
        ('Just now', f"New crop listed: {quantity} {unit} {crop} by {farmer_name}")
    )
    conn.commit()
    conn.close()

    return jsonify({
        'id': crop_id,
        'farmerId': farmer_id,
        'farmerName': farmer_name,
        'farmerLocation': farmer_location,
        'crop': crop,
        'category': category,
        'quantity': quantity,
        'unit': unit,
        'quality': quality,
        'farmerPrice': farmer_price,
        'aiSuggestedMin': ai_min,
        'aiSuggestedMax': ai_max,
        'harvestDate': harvest_date,
        'distanceKm': 38.0,
        'shelfLifeDays': 10,
        'image': image,
        'status': 'active',
        'description': description
    })


# --------------------------------------------------------------------------
# AI Fair-Price Prediction API
# --------------------------------------------------------------------------

@app.route('/api/predictions/price', methods=['POST'])
def api_predict_price():
    data = request.get_json() or {}
    crop = data.get('crop', 'Tomato')
    quantity = float(data.get('quantity', 500))
    quality = data.get('quality', 'Grade A')
    location = data.get('location', 'Kolar')
    season = data.get('season', 'Kharif Late')

    result = predict_fair_price(crop, quantity, quality, location, season)
    return jsonify(result)


# --------------------------------------------------------------------------
# Smart Buyer Matching API
# --------------------------------------------------------------------------

@app.route('/api/buyers/matches', methods=['GET'])
def api_get_buyers():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM buyers ORDER BY match_score DESC')
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        d = dict(r)
        results.append({
            'id': d['id'],
            'name': d['name'],
            'type': d['type'],
            'location': d['location'],
            'distanceKm': d['distance_km'],
            'matchScore': d['match_score'],
            'preferredCrops': json.loads(d['preferred_crops'] or '[]'),
            'requiredVolumeKg': d['required_volume_kg'],
            'maxPriceTolerance': d['max_price_tolerance'],
            'deliveryWindow': d['delivery_window'],
            'reasons': json.loads(d['reasons'] or '[]')
        })

    return jsonify(results)


# --------------------------------------------------------------------------
# Group Transportation & Logistics APIs
# --------------------------------------------------------------------------

@app.route('/api/transport/pools', methods=['GET'])
def api_get_transport_pools():
    pools = [
        {
            'id': 'tr-pool-01',
            'clusterName': 'Kolar - Malur Agri Corridor',
            'destination': 'Bengaluru East Central Hub (Whitefield/K.R. Puram)',
            'farmers': [
                {'name': 'Ramesh Patel', 'village': 'Vokkaleri, Kolar', 'crop': 'Tomatoes', 'qty': 500},
                {'name': 'Suresh Gowda', 'village': 'Torlakki, Malur', 'crop': 'Green Chillies', 'qty': 300},
                {'name': 'Venkatesh R.', 'village': 'Tekal, Malur', 'crop': 'Capsicum', 'qty': 400}
            ],
            'totalPayloadKg': 1200,
            'vehicleCapacityKg': 1500,
            'capacityUtilization': '80%',
            'vehicleType': 'Tata 407 Eco-Agri Van',
            'totalRouteKm': 58,
            'individualTransportCostTotal': 4600,
            'pooledTransportCostTotal': 2850,
            'farmerCostSavingsPercent': 38,
            'status': 'Ready for Dispatch',
            'estimatedDeparture': 'Today, 4:30 PM'
        }
    ]
    return jsonify(pools)

@app.route('/api/transport/optimize', methods=['POST'])
def api_optimize_transport():
    data = request.get_json() or {}
    return jsonify({
        'clusterId': data.get('clusterId', 'tr-pool-01'),
        'status': 'Optimized',
        'algorithm': 'Dijkstra Highway Corridor Clustering',
        'additionalSavingsPercent': 4.2,
        'fuelSavedLitres': 6.8,
        'message': 'Optimal milk-run sequence verified along NH-75 (Kolar -> Malur -> Tekal -> KR Puram Hub).'
    })


# --------------------------------------------------------------------------
# Price Transparency API
# --------------------------------------------------------------------------

@app.route('/api/price-breakdown', methods=['GET'])
def api_price_breakdown():
    crop = request.args.get('crop', 'Tomato')
    breakdowns = {
        'tomato': {
            'crop': 'Hybrid Tomato (Sahu Red)',
            'farmerShare': 28.00,
            'transportation': 3.20,
            'storageHandling': 1.80,
            'platformService': 1.00,
            'finalConsumerPrice': 34.00,
            'traditionalMiddlemanPrice': 46.00,
            'farmerGainPercent': '+33%',
            'consumerSavingPercent': '-26%'
        },
        'onion': {
            'crop': 'Red Onion (Bellary Medium)',
            'farmerShare': 24.50,
            'transportation': 2.80,
            'storageHandling': 2.20,
            'platformService': 1.00,
            'finalConsumerPrice': 30.50,
            'traditionalMiddlemanPrice': 42.00,
            'farmerGainPercent': '+28%',
            'consumerSavingPercent': '-27%'
        },
        'chilli': {
            'crop': 'Fresh Green Chillies (G4)',
            'farmerShare': 42.00,
            'transportation': 3.50,
            'storageHandling': 2.50,
            'platformService': 1.50,
            'finalConsumerPrice': 49.50,
            'traditionalMiddlemanPrice': 65.00,
            'farmerGainPercent': '+31%',
            'consumerSavingPercent': '-24%'
        },
        'potato': {
            'crop': 'Potatoes (Jyoti Grade-1)',
            'farmerShare': 21.00,
            'transportation': 2.50,
            'storageHandling': 2.00,
            'platformService': 0.90,
            'finalConsumerPrice': 26.40,
            'traditionalMiddlemanPrice': 36.00,
            'farmerGainPercent': '+25%',
            'consumerSavingPercent': '-27%'
        }
    }

    matched_key = next((k for k in breakdowns if k in crop.lower()), 'tomato')
    return jsonify(breakdowns[matched_key])


# --------------------------------------------------------------------------
# Smart Storage Advisor API ("Sell Now or Store?")
# --------------------------------------------------------------------------

@app.route('/api/storage/advice', methods=['POST'])
def api_storage_advice():
    data = request.get_json() or {}
    crop = data.get('crop', 'Red Onion')
    quantity = float(data.get('quantity', 1200))
    current_price = float(data.get('currentPrice', 24.50))
    storage_cost_per_day = float(data.get('storageCostPerDay', 0.12))
    storage_days = int(data.get('storageDays', 20))

    advice = evaluate_storage_advice(crop, quantity, current_price, storage_cost_per_day, storage_days)
    return jsonify(advice)


# --------------------------------------------------------------------------
# Unsold Crop Rescue APIs
# --------------------------------------------------------------------------

@app.route('/api/rescue/destinations', methods=['GET'])
def api_rescue_destinations():
    destinations = [
        {
            'channel': 'Local Food Processing & Sauce Units',
            'suitability': 'Very High (for 2nd grade / surplus ripe tomatoes & fruits)',
            'priceRealization': '70% - 85% of fresh market price',
            'turnaround': 'Within 12 - 24 Hours'
        },
        {
            'channel': 'High-Volume Commercial Kitchens & Caterers',
            'suitability': 'High (for immediate next-day consumption)',
            'priceRealization': '75% - 90% of fresh market price',
            'turnaround': 'Same day evening delivery'
        },
        {
            'channel': 'NGOs & Community Food Rescue Partners',
            'suitability': 'High (preventing total post-harvest spoilage waste)',
            'priceRealization': 'Subsidized community purchase / logistics reimbursement',
            'turnaround': 'Immediate pickup'
        },
        {
            'channel': 'Livestock Feed & Organic Compost Processors',
            'suitability': 'Medium-Low (for over-ripe / damaged surplus)',
            'priceRealization': 'Base salvage value (₹3 - ₹7/kg)',
            'turnaround': 'Within 48 Hours'
        }
    ]
    return jsonify(destinations)

@app.route('/api/rescue/request', methods=['POST'])
def api_create_rescue_request():
    data = request.get_json() or {}
    req_id = f"res-{uuid.uuid4().hex[:6]}"
    crop = data.get('crop', 'Tomatoes')
    quantity = float(data.get('quantity', 500))
    time_sens = data.get('timeSensitivity', '24 Hours')
    grade = data.get('conditionGrade', 'Fully Ripe')
    location = data.get('location', 'Kolar')
    floor_price = float(data.get('floorPrice', 16.0))

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO rescue_requests (id, crop, quantity, time_sensitivity, condition_grade, location, min_floor_price)
        VALUES (?,?,?,?,?,?,?)
    ''', (req_id, crop, quantity, time_sens, grade, location, floor_price))

    cursor.execute(
        'INSERT INTO admin_activity (time_str, activity_text) VALUES (?, ?)',
        ('Just now', f"Urgent rescue broadcasted: {quantity} kg {crop} from {location}")
    )
    conn.commit()
    conn.close()

    return jsonify({
        'success': True,
        'requestId': req_id,
        'message': f"Emergency rescue broadcasted to 4 partner channels within 50 km."
    })


# --------------------------------------------------------------------------
# Orders APIs
# --------------------------------------------------------------------------

@app.route('/api/orders', methods=['GET'])
def api_get_orders():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM orders ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        d = dict(r)
        results.append({
            'id': d['id'],
            'cropId': d['crop_id'],
            'cropName': d['crop_name'],
            'farmerName': d['farmer_name'],
            'buyerName': d['buyer_name'],
            'quantity': d['quantity'],
            'unit': d['unit'],
            'farmerPricePerKg': d['farmer_price_per_kg'],
            'totalAmount': d['total_amount'],
            'status': d['status'],
            'orderDate': d['order_date'],
            'deliveryAddress': d['delivery_address']
        })

    return jsonify(results)

@app.route('/api/orders', methods=['POST'])
def api_create_order():
    data = request.get_json() or {}
    order_id = f"ord-{uuid.uuid4().hex[:4]}"
    crop_id = data.get('cropId', '')
    crop_name = data.get('cropName', 'Crop')
    farmer_name = data.get('farmerName', 'Ramesh Patel')
    buyer_name = data.get('buyerName', 'Green Valley Fresh Supermarkets')
    quantity = float(data.get('quantity', 300))
    unit = data.get('unit', 'kg')
    price_per_kg = float(data.get('farmerPricePerKg', 28.0))
    total_amount = float(data.get('totalAmount', quantity * price_per_kg))
    status = data.get('status', 'Order Confirmed - Pooled Transit Scheduled')
    order_date = data.get('orderDate', '2026-09-04 02:30 PM')
    address = data.get('deliveryAddress', 'Bengaluru East Hub')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO orders (id, crop_id, crop_name, farmer_name, buyer_name, quantity, unit, farmer_price_per_kg, total_amount, status, order_date, delivery_address)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    ''', (order_id, crop_id, crop_name, farmer_name, buyer_name, quantity, unit, price_per_kg, total_amount, status, order_date, address))

    cursor.execute(
        'INSERT INTO admin_activity (time_str, activity_text) VALUES (?, ?)',
        ('Just now', f"Order #{order_id} placed: {quantity} {unit} {crop_name} by {buyer_name}")
    )
    conn.commit()
    conn.close()

    return jsonify({
        'id': order_id,
        'cropId': crop_id,
        'cropName': crop_name,
        'farmerName': farmer_name,
        'buyerName': buyer_name,
        'quantity': quantity,
        'unit': unit,
        'farmerPricePerKg': price_per_kg,
        'totalAmount': total_amount,
        'status': status,
        'orderDate': order_date,
        'deliveryAddress': address
    })


# --------------------------------------------------------------------------
# Admin Metrics API
# --------------------------------------------------------------------------

@app.route('/api/admin/metrics', methods=['GET'])
def api_admin_metrics():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('SELECT COUNT(*) FROM crops WHERE status = "active"')
    active_listings = cursor.fetchone()[0]

    cursor.execute('SELECT COUNT(*) FROM orders')
    active_orders = cursor.fetchone()[0]

    cursor.execute('SELECT time_str, activity_text FROM admin_activity ORDER BY id DESC LIMIT 6')
    recent_activity = [{'time': r['time_str'], 'text': r['activity_text']} for r in cursor.fetchall()]
    conn.close()

    metrics = {
        'totalFarmers': 142,
        'activeBuyers': 38,
        'activeListings': active_listings,
        'activeOrders': active_orders,
        'activeSharedTransitRuns': 7,
        'totalLogisticsSavingsRupees': '₹1,48,200',
        'unsoldProduceRescuedKg': '18,500 kg',
        'recentActivity': recent_activity
    }

    return jsonify(metrics)


# --------------------------------------------------------------------------
# Server Startup
# --------------------------------------------------------------------------

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("=" * 60)
    print(f"[Farm2Fair] Full-Stack Server Running on http://localhost:{port}")
    print(f"[Farm2Fair] Serving Frontend SPA + Backend REST APIs seamlessly")
    print("=" * 60)
    app.run(host='0.0.0.0', port=port, debug=False)
