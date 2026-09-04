"""
Farm2Fair — SQLite Database Layer
Smart India Hackathon 2026
Provides zero-config SQL persistence for users, crops, buyers, orders, transport pools, and rescue requests.
"""

import sqlite3
import os
import json

DB_FILE = os.path.join(os.path.dirname(__file__), 'farm2fair.db')

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            email TEXT UNIQUE,
            phone TEXT,
            location TEXT,
            avatar TEXT,
            rating REAL DEFAULT 4.8
        )
    ''')

    # Crops Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS crops (
            id TEXT PRIMARY KEY,
            farmer_id TEXT,
            farmer_name TEXT,
            farmer_location TEXT,
            crop TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity REAL NOT NULL,
            unit TEXT DEFAULT 'kg',
            quality TEXT,
            farmer_price REAL NOT NULL,
            ai_suggested_min REAL,
            ai_suggested_max REAL,
            harvest_date TEXT,
            distance_km REAL,
            shelf_life_days INTEGER,
            image TEXT,
            status TEXT DEFAULT 'active',
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Buyers Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS buyers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            location TEXT NOT NULL,
            distance_km REAL,
            match_score INTEGER,
            preferred_crops TEXT,
            required_volume_kg REAL,
            max_price_tolerance REAL,
            delivery_window TEXT,
            reasons TEXT
        )
    ''')

    # Orders Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            crop_id TEXT,
            crop_name TEXT,
            farmer_name TEXT,
            buyer_name TEXT,
            quantity REAL,
            unit TEXT,
            farmer_price_per_kg REAL,
            total_amount REAL,
            status TEXT,
            order_date TEXT,
            delivery_address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Rescue Requests Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rescue_requests (
            id TEXT PRIMARY KEY,
            crop TEXT,
            quantity REAL,
            time_sensitivity TEXT,
            condition_grade TEXT,
            location TEXT,
            min_floor_price REAL,
            status TEXT DEFAULT 'Broadcasted',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Admin Activity Log
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admin_activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time_str TEXT,
            activity_text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()

    # Seed initial data if tables are empty
    seed_initial_data(conn)
    conn.close()

def seed_initial_data(conn):
    cursor = conn.cursor()
    
    # Check if users already seeded
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] > 0:
        return

    # 1. Seed Users
    users = [
        ('usr-f-1', 'Ramesh Patel', 'farmer', 'ramesh.patel@kolarfarms.in', '+91 98450 12345', 'Kolar, Karnataka', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 4.9),
        ('usr-f-2', 'Suresh Gowda', 'farmer', 'suresh.gowda@malurfarms.in', '+91 98450 67890', 'Malur, Karnataka', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 4.8),
        ('usr-b-1', 'Green Valley Fresh Supermarkets', 'buyer', 'procure@greenvalleyfresh.com', '+91 80 2345 6789', 'Bengaluru East Hub', None, 4.9),
        ('usr-b-2', 'SpiceCraft Cloud Kitchens', 'buyer', 'chef@spicecraftkitchens.com', '+91 80 4455 1122', 'Indiranagar, Bengaluru', None, 4.8),
        ('usr-c-1', 'Priya Sharma', 'consumer', 'priya.sharma@example.com', '+91 99887 76655', 'Whitefield, Bengaluru', None, 5.0),
        ('usr-a-1', 'SIH Platform Monitor (Admin)', 'admin', 'admin@farm2fair.gov.in.demo', '+91 11 2026 8888', 'New Delhi HQ', None, 5.0)
    ]
    cursor.executemany('INSERT INTO users VALUES (?,?,?,?,?,?,?,?)', users)

    # 2. Seed Crops
    crops = [
        ('crop-101', 'usr-f-1', 'Ramesh Patel', 'Kolar, Karnataka', 'Hybrid Tomato (Sahu Red)', 'Vegetables', 500, 'kg', 'Grade A (Firm, Uniform Size)', 28.0, 28.0, 34.0, '2026-09-02', 42.0, 8, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80', 'active', 'Vine-ripened, naturally cultivated Grade-A tomatoes with high shelf-life, ready for bulk pickup.'),
        ('crop-102', 'usr-f-1', 'Ramesh Patel', 'Kolar, Karnataka', 'Red Onion (Bellary Medium)', 'Vegetables', 1200, 'kg', 'Grade A (Well-cured)', 24.5, 24.0, 29.0, '2026-08-28', 42.0, 45, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80', 'active', 'Sun-dried and sorted Bellary red onions. Low moisture content suitable for storage or immediate distribution.'),
        ('crop-103', 'usr-f-2', 'Suresh Gowda', 'Malur, Karnataka', 'Fresh Green Chillies (G4)', 'Vegetables', 300, 'kg', 'Grade A (Sharp Pungency)', 42.0, 40.0, 48.0, '2026-09-03', 34.0, 12, 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80', 'active', 'Crisp, hot green chillies harvested this morning. Ideal for restaurants, hotels, and spice processing.'),
        ('crop-104', 'usr-f-2', 'Suresh Gowda', 'Malur, Karnataka', 'Potatoes (Jyoti Grade-1)', 'Vegetables', 1800, 'kg', 'Grade A (Unblemished)', 21.0, 20.0, 25.0, '2026-08-25', 34.0, 30, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80', 'active', 'Clean, sorted table-variety potatoes. High dry-matter content preferred by cloud kitchens.'),
        ('crop-105', 'usr-f-1', 'Ramesh Patel', 'Kolar, Karnataka', 'Organic Turmeric Rhizomes', 'Spices', 450, 'kg', 'Premium Curcumin > 3.8%', 85.0, 82.0, 98.0, '2026-08-15', 42.0, 180, 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80', 'active', 'Naturally grown raw turmeric fingers with rich aromatic oils and high active curcumin.'),
        ('crop-106', 'usr-f-2', 'Suresh Gowda', 'Malur, Karnataka', 'Basmati Paddy Grain (Pusa 1121)', 'Grains', 2500, 'kg', 'Grade A (Moisture < 12%)', 38.5, 37.0, 43.0, '2026-08-10', 34.0, 365, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80', 'active', 'Long grain aged aromatic paddy directly sourced from certified growers.')
    ]
    cursor.executemany('''
        INSERT INTO crops (id, farmer_id, farmer_name, farmer_location, crop, category, quantity, unit, quality, farmer_price, ai_suggested_min, ai_suggested_max, harvest_date, distance_km, shelf_life_days, image, status, description)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', crops)

    # 3. Seed Buyers
    buyers = [
        ('byr-01', 'Green Valley Fresh Supermarkets', 'Supermarket Chain (8 Outlets)', 'Bengaluru East Distribution Hub', 38.0, 94,
         json.dumps(['Hybrid Tomato (Sahu Red)', 'Red Onion (Bellary Medium)', 'Potatoes (Jyoti Grade-1)']),
         600.0, 33.5, 'Within 24 Hours',
         json.dumps([
             'High demand for Grade-A Tomatoes (600 kg requested)',
             'Direct logistic corridor along NH-75 (Kolar → Bengaluru)',
             'Accepts AI Fair-Price corridor without delay',
             'Guaranteed next-day electronic settlement'
         ])),
        ('byr-02', 'SpiceCraft Cloud Kitchens', 'Hospitality / Food Chain', 'Indiranagar & Whitefield Hub', 44.0, 89,
         json.dumps(['Hybrid Tomato (Sahu Red)', 'Fresh Green Chillies (G4)', 'Red Onion (Bellary Medium)']),
         350.0, 34.0, 'Next Morning 6:00 AM',
         json.dumps([
             'Requires 350 kg firm tomatoes + 50 kg chillies',
             'Direct bulk kitchen consumption',
             'Offers premium for same-day morning harvest',
             'Can combine pickup with nearby Malur farm'
         ])),
        ('byr-03', 'Aroma Food Processors Ltd.', 'Food Processing / Puree Plant', 'Hosakote Industrial Area', 26.0, 82,
         json.dumps(['Hybrid Tomato (Sahu Red)', 'Red Onion (Bellary Medium)']),
         1500.0, 30.0, 'Within 3 Days',
         json.dumps([
             'Very close location (26 km)',
             'High volume intake capacity',
             'Takes both Grade A & B for puree extraction',
             'Ideal backup partner for large harvests'
         ])),
        ('byr-04', 'Koramangala Community Organic Co-op', 'Consumer Co-operative', 'Koramangala, Bengaluru', 48.0, 78,
         json.dumps(['Hybrid Tomato (Sahu Red)', 'Organic Turmeric Rhizomes']),
         200.0, 36.0, 'Weekend Delivery',
         json.dumps([
             'Willing to pay premium fair price',
             'Direct consumer visibility for farmer brand',
             'Requires smaller batches'
         ]))
    ]
    cursor.executemany('INSERT INTO buyers VALUES (?,?,?,?,?,?,?,?,?,?,?)', buyers)

    # 4. Seed Orders
    orders = [
        ('ord-901', 'crop-101', 'Hybrid Tomato (Sahu Red)', 'Ramesh Patel', 'Green Valley Fresh Supermarkets', 500, 'kg', 28.0, 14000.0, 'In Shared Logistics Transit', '2026-09-04 09:30 AM', 'Bengaluru East Central Hub, KR Puram'),
        ('ord-902', 'crop-103', 'Fresh Green Chillies (G4)', 'Suresh Gowda', 'SpiceCraft Cloud Kitchens', 150, 'kg', 42.0, 6300.0, 'Confirmed - Awaiting Pickup', '2026-09-04 10:15 AM', 'SpiceCraft Central Kitchen, Indiranagar')
    ]
    cursor.executemany('''
        INSERT INTO orders (id, crop_id, crop_name, farmer_name, buyer_name, quantity, unit, farmer_price_per_kg, total_amount, status, order_date, delivery_address)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
    ''', orders)

    # 5. Seed Activity
    activities = [
        ('10 mins ago', 'New crop listed: 500 kg Tomatoes by Ramesh Patel (Kolar)'),
        ('18 mins ago', 'AI Fair Price Corridor predicted: ₹28 - ₹34/kg for Kolar Tomatoes'),
        ('25 mins ago', 'Green Valley Fresh Supermarket matched with 94% fit score'),
        ('38 mins ago', 'Shared transport route #TR-01 clustered (Kolar + Malur farmers)'),
        ('52 mins ago', 'Price transparency report generated for Order #ORD-901')
    ]
    cursor.executemany('INSERT INTO admin_activity (time_str, activity_text) VALUES (?,?)', activities)

    conn.commit()
