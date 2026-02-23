#!/bin/bash
sleep 10
STATUS=$(curl -s http://localhost:8080/health 2>/dev/null)
if echo "$STATUS" | grep -q "ok"; then
  LOOPS=$(curl -s -X POST http://localhost:8080/mcp \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_active_loops","arguments":{}}}' 2>/dev/null)
  if echo "$LOOPS" | grep -qE "No active loops|\[\]"; then
    curl -s -X POST http://localhost:8080/mcp \
      -H "Content-Type: application/json" \
      -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"activate_infinite_loop","arguments":{"message":"actloop alien invasion game improvements"}}}' > /dev/null
    echo "ZAI loop activated!"
  else
    echo "ZAI loop already running."
  fi
else
  echo "ZAI server not ready yet - start it manually."
fi
