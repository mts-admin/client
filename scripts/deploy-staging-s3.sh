export REACT_APP_API_URL=${API_URL}
export CLOUDFRONT_ID=${CLOUDFRONT_ID}

npm run build

# –acl public-read option tells Amazon to ensure all the files you upload are publicly readable
# –delete flag tells Amazon to delete any files from your bucket that don’t exist in your local folder
aws s3 sync --acl public-read --delete "$PWD/build/" s3://www.staging.privatedashboardapp.com
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths '/*'
