# curl --request POST \
#   --url https://tiktok-gorgon.herokuapp.com/ \
#   --header 'content-type: application/json' \
#   --data '{
#    "url":"aweme_id=6948740634060639493&os_api=25&device_type=SM-G930F&ssmix=a&manifest_version_code=2019091803&dpi=560&carrier_region=FR&uoo=0&region=US&carrier_region_v2=208&app_name=musical_ly&version_name=13.1.3&timezone_offset=3600&ts=1569407751&ab_version=13.1.3&pass-route=1&pass-region=1&is_my_cn=0&ac2=wifi5g&ac=wifi&app_type=normal&channel=googleplay&update_version_code=2019091803&_rticket=1569407751490&device_platform=android&iid=6740283443298715398&build_number=13.1.3&locale=en&version_code=130103&timezone_name=Europe%2FParis&openudid=d65d0efd4bbd2ae8&device_id=6740283146010527238&sys_region=US&app_language=en&resolution=1440*2560&device_brand=samsung&language=en&os_version=7.1.2&aid=1233&mcc_mnc=20801",
#    "data":"",
#    "cookie":"",
#    "token":"d987c78f-893c-4c54-968f-a5f82774582c"
# }


for i in range(8):
  if i%2 == 0:
    print(i)