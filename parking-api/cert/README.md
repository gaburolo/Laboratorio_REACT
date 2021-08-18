# How install SSL certificates on your Node JS server?

[For now .... go and take a look at this video!](https://www.youtube.com/watch?v=USrMdBF0zcg)

> ⚠️ OpenSSL is a requirement to run this tutorial.

Steps for SSL cert generation using `openssl`:

1. Generate a private key. `$openssl genrsa -out key.pem`

2. Generate a CSR (certificate signing request) using private key. `$openssl req -new -key key.pem -out csr.pem` (use a password only if you need)

3. Generate the SSL certification from CSR. `$openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`