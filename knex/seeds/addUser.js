/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  await knex('User').del();

  // Password - Vishnu@123
  await knex('User').insert([
    { id: 1, name: 'Vishnuraj', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075355', role: 'superadmin' },
    { id: 2, name: 'TEST2', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075301', role: 'admin' },
    { id: 3, name: 'Raj', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075302', role: 'superadmin' },

    { id: 4, name: 'TEST4', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075303', role: 'user' },
    { id: 5, name: 'TEST5', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075304', role: 'user' },
    { id: 6, name: 'TEST6', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075305', role: 'user' },
    { id: 7, name: 'TEST7', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075306', role: 'user' },
    { id: 8, name: 'Vishnu', password: '$2a$10$jroTKhCzhC7i1jzhrYpvT.M4jJZISt4DLBOxkNhuH1UjMYWS9mV16', gender: 'Male', mobileNumber: '9786075307', role: 'superAdmin' },
  ]);
};
