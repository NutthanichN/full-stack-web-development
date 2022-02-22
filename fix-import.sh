echo "export default {};" > node_modules/@sveltejs/kit/dist/index.js
sed -i '/"types": ".\/types\/index.d.ts"/a ,"import": ".\/dist\/index.js"' node_modules/@sveltejs/kit/package.json