'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if users already exist
    const existingUsers = await queryInterface.sequelize.query(
      `SELECT COUNT(*) as count FROM users;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Only seed if database is empty
    if (existingUsers[0].count > 0) {
      console.log('✅ Users already exist, skipping seeding');
      return;
    }

    console.log('🌱 Seeding demo users...');

    const users = [
      {
        name: 'Harsha Royal',
        email: 'harsha.royal@example.com',
        phone: '+91-9876543210',
        company: 'OpenAI India',
        address: JSON.stringify({
          street: '11 MG Road',
          city: 'Bangalore',
          zip: '560001',
          geo: { lat: '12.9716', lng: '77.5946' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91-9876543211',
        company: 'Tech Solutions Pvt Ltd',
        address: JSON.stringify({
          street: '45 Park Street',
          city: 'Mumbai',
          zip: '400001',
          geo: { lat: '19.0760', lng: '72.8777' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rahul Verma',
        email: 'rahul.verma@example.com',
        phone: '+91-9876543212',
        company: 'Digital Innovations',
        address: JSON.stringify({
          street: '23 Connaught Place',
          city: 'New Delhi',
          zip: '110001',
          geo: { lat: '28.7041', lng: '77.1025' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ananya Reddy',
        email: 'ananya.reddy@example.com',
        phone: '+91-9876543213',
        company: 'StartupHub',
        address: JSON.stringify({
          street: '78 Hi-Tech City',
          city: 'Hyderabad',
          zip: '500081',
          geo: { lat: '17.3850', lng: '78.4867' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        phone: '+91-9876543214',
        company: 'Enterprise Systems',
        address: JSON.stringify({
          street: '56 Salt Lake City',
          city: 'Kolkata',
          zip: '700064',
          geo: { lat: '22.5726', lng: '88.3639' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sneha Patel',
        email: 'sneha.patel@example.com',
        phone: '+91-9876543215',
        company: 'CloudTech Inc',
        address: JSON.stringify({
          street: '34 CG Road',
          city: 'Ahmedabad',
          zip: '380009',
          geo: { lat: '23.0225', lng: '72.5714' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Arjun Kapoor',
        email: 'arjun.kapoor@example.com',
        phone: '+91-9876543216',
        company: 'WebDev Solutions',
        address: JSON.stringify({
          street: '89 Koramangala',
          city: 'Bangalore',
          zip: '560034',
          geo: { lat: '12.9352', lng: '77.6245' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Meera Iyer',
        email: 'meera.iyer@example.com',
        phone: '+91-9876543217',
        company: 'InfoSys Technologies',
        address: JSON.stringify({
          street: '12 Anna Salai',
          city: 'Chennai',
          zip: '600002',
          geo: { lat: '13.0827', lng: '80.2707' }
        }),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
    console.log('✅ Demo users seeded successfully');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    console.log('✅ Demo users removed successfully');
  }
};
