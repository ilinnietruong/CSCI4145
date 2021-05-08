#Second website for docker 2 for multi dockers.
import os,requests
from flask import Flask, jsonify, request, render_template, redirect

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/setint', methods=['GET', 'POST'])
def setint():
	keyword = request.args.get('keyword', '')
	url = "http://numbersapi.com/" + str(keyword)
	response = requests.get(url)
	data = response.text
	return render_template('index.html',name = data)


