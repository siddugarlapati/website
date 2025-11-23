// Generate password hashes
import bcrypt from 'bcryptjs';

const adminPassword = 'admin123';
const clientPassword = 'password123';

console.log('=== Password Hashes ===\n');
console.log('Admin Password (admin123):');
console.log(bcrypt.hashSync(adminPassword, 10));
console.log('\nClient Password (password123):');
console.log(bcrypt.hashSync(clientPassword, 10));
console.log('\n======================');
