# from picamera import PiCamera
# from datetime import datetime
# from time import sleep

# picam = PiCamera()

# picam.start_preview()
# sleep(5)
# filename ='/home/pi/pics/'+datetime.now().strftime("%Y%m%d%H%M%S%f")+'.jpg'
# picam.capture(filename)

# picam.stop_preview()

# import http.client, urllib.parse

#GET
# conn = http.client.HTTPConnection('localhost',4000)
# conn.request("GET", "/api/challans/8423")
# r1 = conn.getresponse()
# print(r1.status, r1.reason)
# print(r1.read())
# conn.close()
#POST


# params = urllib.parse.urlencode({'platenum': 1234, 'geoLat': 17, 'geoLng': 57,'desc':"wrong parking"})
# #headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
# conn1 = http.client.HTTPConnection("musi-cal.mojam.com:80")
# conn1.request("POST", "api/ipfs/file", params)#, headers
# response = conn1.getresponse()
# print(response.status, response.reason)

# data1 = response.read()
# conn1.close()


#using requests library
#pip install requests

# import requests
# import os
# image_filename = os.path.basename('sample.png')

# multipart_form_data = {'ipfsfile': (image_filename,open('./sample.png', 'rb'))}
# values = {'platenum': '8422', 'geoLat': 17, 'geoLng': 57,'desc':'wrong parking'}
# response = requests.post('http://localhost:4000/api/ipfs/file',
#                             files=multipart_form_data,data=values)

# print(response.status_code)

