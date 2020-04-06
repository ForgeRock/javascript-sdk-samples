HOST=$1
SUFFIX=com

mkdir -p certs

# Generate the root key
openssl genrsa -des3 -out certs/$HOST-ca.key 2048

# Create a CA configuration file
echo \
"FQDN = $HOST-ca.$SUFFIX
ORGNAME = ForgeRock SDK Samples CA
ALTNAMES = DNS:\$FQDN

[req]
default_bits = 2048
default_md = sha256
prompt = no
encrypt_key = no
distinguished_name = dn
req_extensions = req_ext

[dn]
C = US
O = \$ORGNAME
CN = \$FQDN

[req_ext]
subjectAltName = \$ALTNAMES
"> certs/$HOST-ca.conf

# Generate a root certificate based on the root key
openssl req -x509 -new -nodes -key certs/$HOST-ca.key -sha256 -days 1825 \
  -out certs/$HOST-ca.pem -config certs/$HOST-ca.conf

# Generate a new private key
openssl genrsa -out certs/$HOST.key 2048

# Create a CSR configuration file
echo \
"FQDN = $HOST.$SUFFIX
ORGNAME = ForgeRock SDK Samples
ALTNAMES = DNS:\$FQDN

[req]
default_bits = 2048
default_md = sha256
prompt = no
encrypt_key = no
distinguished_name = dn
req_extensions = req_ext

[dn]
C = US
O = \$ORGNAME
CN = \$FQDN

[req_ext]
subjectAltName = \$ALTNAMES
"> certs/$HOST.csr.conf

# Generate a Certificate Signing Request (CSR) based on that private key
openssl req -new -key certs/$HOST.key -out certs/$HOST.csr \
  -config certs/$HOST.csr.conf

# Create a configuration-file
echo \
"authorityKeyIdentifier = keyid,issuer
basicConstraints = CA:FALSE
keyUsage = digitalSignature,nonRepudiation,keyEncipherment,dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = $HOST.$SUFFIX
"> certs/$HOST.conf

# Create the certificate for the webserver
openssl x509 -req -in certs/$HOST.csr -CA certs/$HOST-ca.pem -CAkey certs/$HOST-ca.key -CAcreateserial \
  -out certs/$HOST.crt -days 1825 -sha256 -extfile certs/$HOST.conf
