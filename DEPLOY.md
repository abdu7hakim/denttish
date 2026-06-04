# DentTish — Telegram Mini App

## Build
```bash
npm run build
```

## Nginx deployment

1. Copy `dist/` contents to server (e.g. `/var/www/denttish/`)
2. Place `nginx.conf` in `/etc/nginx/sites-available/denttish`
3. Enable site: `ln -s /etc/nginx/sites-available/denttish /etc/nginx/sites-enabled/`
4. Test: `nginx -t`
5. Reload: `systemctl reload nginx`

## SSL (required for Telegram)
```bash
certbot --nginx -d your-domain.com
```

## Telegram BotFather setup
1. Go to @BotFather
2. Create bot or edit existing
3. Set Mini App URL to `https://your-domain.com`
4. Ensure HTTPS is working

## Important
- Domain **must** be HTTPS (Telegram requirement)
- App works inside Telegram WebView
- CSP allows Telegram iframe embedding
