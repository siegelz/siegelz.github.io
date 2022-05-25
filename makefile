# Non-file targets
publish: last_updated
	git add *.html *.txt cv.pdf makefile static/* courses/*
	git commit -m "make publish"
	git push -u origin main

last_updated: last_updated_paradigm.txt
	echo "Last Updated:" > last_updated.txt
	date >> last_updated.txt

clean:
	rm -f *~ \#*\#

# File targets
last_updated_paradigm.txt: paradigm.html 
	echo "Last Updated:" > last_updated_paradigm.txt
	date >> last_updated_paradigm.txt
