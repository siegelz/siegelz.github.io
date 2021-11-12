publish:
	echo "Last Updated" > last_updated.txt
	date >> last_updated.txt
	git add *.html last_updated.txt
	git commit -m "make publish"
	git push -u origin main
