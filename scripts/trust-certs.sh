HOST=$1
SUFFIX=com

security add-trusted-cert -d -r trustRoot -k '/Library/Keychains/System.keychain' certs/$HOST-ca.pem

security add-trusted-cert -d -r trustAsRoot -k '/Library/Keychains/System.keychain' certs/$HOST.crt
