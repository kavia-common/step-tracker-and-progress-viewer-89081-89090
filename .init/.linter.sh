#!/bin/bash
cd /home/kavia/workspace/code-generation/step-tracker-and-progress-viewer-89081-89090/steps_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

