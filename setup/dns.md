# Domain Resolution

In order to use a fake domain to view samples, we'll need to add this domain to our hosts file.

```bash
echo '127.0.0.1 app.example.com' | sudo tee -a /etc/hosts
```
