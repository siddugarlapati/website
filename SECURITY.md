# 🔒 Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Aryantra, please report it to:

**Email**: security@aryantra.com (replace with actual email)

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will respond within 48 hours and work to resolve the issue promptly.

---

## Security Measures Implemented

### ✅ Authentication & Authorization

- **JWT-based authentication** with secure token signing
- **Password hashing** using bcrypt (10 rounds)
- **Token expiration** (24 hours)
- **Role-based access control** (admin/client)

### ✅ API Security

- **Rate limiting** (100 requests per 15 minutes)
- **AI endpoint rate limiting** (10 requests per minute)
- **Input sanitization** to prevent XSS
- **CORS protection** with whitelist
- **Helmet.js** security headers

### ✅ Data Protection

- **Environment variables** for sensitive data
- **No API keys in client code**
- **Secure password storage** (bcrypt hashing)
- **HTTPS enforcement** (in production)

### ✅ Database Security

- **Supabase Row Level Security (RLS)**
- **Prepared statements** (SQL injection prevention)
- **Input validation** on all endpoints
- **Connection encryption**

---

## Security Best Practices

### For Developers

1. **Never commit secrets** to version control
2. **Use strong passwords** (min 12 characters)
3. **Rotate JWT secrets** regularly
4. **Keep dependencies updated** (`npm audit`)
5. **Review code** for security issues
6. **Use HTTPS** in production
7. **Enable 2FA** on hosting accounts

### For Administrators

1. **Change default credentials** immediately
2. **Use unique passwords** for each service
3. **Enable monitoring** and alerts
4. **Regular security audits**
5. **Backup database** regularly
6. **Limit API quotas** on Google Cloud
7. **Review access logs** periodically

---

## Known Limitations

### Current Implementation

⚠️ **Password Storage**: While passwords are hashed, consider implementing:
- Password strength requirements
- Password reset functionality
- Account lockout after failed attempts
- 2FA for admin accounts

⚠️ **Session Management**: Consider adding:
- Refresh tokens
- Token revocation
- Session timeout warnings

⚠️ **Audit Logging**: Implement:
- Login attempt logging
- Admin action logging
- API usage tracking

---

## Security Checklist

### Before Production Deployment

- [ ] All default passwords changed
- [ ] JWT secret is strong (32+ characters)
- [ ] All passwords are hashed
- [ ] HTTPS enabled
- [ ] CORS configured for production domain only
- [ ] Rate limiting tested
- [ ] Supabase RLS policies enabled
- [ ] Security headers verified
- [ ] API quotas set on Google Cloud
- [ ] Monitoring and alerts configured
- [ ] Backup strategy implemented
- [ ] Security audit completed

### Regular Maintenance

- [ ] Update dependencies monthly (`npm audit fix`)
- [ ] Review access logs weekly
- [ ] Rotate JWT secret quarterly
- [ ] Security audit annually
- [ ] Penetration testing annually

---

## Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Acknowledgment sent to reporter
3. **Day 3-7**: Investigation and fix development
4. **Day 8-14**: Testing and deployment
5. **Day 15**: Public disclosure (if appropriate)

---

## Security Updates

### Version 1.0.0 (Current)

- ✅ JWT authentication implemented
- ✅ Password hashing with bcrypt
- ✅ Rate limiting enabled
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input sanitization

### Planned Improvements

- [ ] 2FA for admin accounts
- [ ] Password reset functionality
- [ ] Account lockout mechanism
- [ ] Audit logging
- [ ] Refresh token implementation
- [ ] Advanced threat detection

---

## Compliance

### GDPR Considerations

- User data is stored securely
- Users can request data deletion
- Privacy policy should be implemented
- Cookie consent required

### Data Retention

- Booking data: Retained for 2 years
- Application data: Retained for 1 year
- Logs: Retained for 90 days

---

## Contact

For security concerns:
- **Email**: security@aryantra.com
- **Response Time**: Within 48 hours
- **Severity Levels**: Critical (24h), High (48h), Medium (1 week), Low (2 weeks)

---

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve our security.

---

**Last Updated**: November 22, 2025
**Next Review**: February 22, 2026
