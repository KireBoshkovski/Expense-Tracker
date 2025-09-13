#!/bin/bash

for dir in k8s/*/; do
    echo "Deploying $dir"
    kubectl apply -f "$dir"
done

echo "Done!"