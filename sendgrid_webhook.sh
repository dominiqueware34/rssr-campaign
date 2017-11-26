function localtunnel {
lt -s dwaredomthebom --port 5000
}

until localtunnel; do
echo "localtunnel server crashed like a mf"
sleep 2
done
