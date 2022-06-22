#!/bin/bash

# Recreate config file
rm -rf ./static/env-config.js
touch ./static/env-config.js

# Add assignment
echo "window._env_ = {" >> ./static/env-config.js

# Append configuration property to JS file
echo "  FEATURE_TICKETS_ENABLED: \"$FEATURE_TICKETS_ENABLED\"," >> ./static/env-config.js
echo "  FEATURE_C4P_ENABLED: \"$FEATURE_C4P_ENABLED\"," >> ./static/env-config.js
echo "  FEATURE_SPEAKERS_ENABLED: \"$FEATURE_SPEAKERS_ENABLED\"," >> ./static/env-config.js

echo "}" >> ./static/env-config.js

cat ./static/env-config.js

ls -al

ls -al ./static/

ls -al ./static/images/

exec java $JAVA_OPTS -jar app.jar