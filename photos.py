import json
import glob

dir = "/home/james/Programs/digitalPhotos/photos/"
def getImages():
    file_types = [dir + "*.jpg", dir +  "*.png", dir +  "*.svg", dir + "*.tif"]
    files = []
    for extension in file_types:
        for i in glob.glob(extension):
            files.append(i)
    with open("images.json", 'w') as outfile:
         json.dump(files, outfile);
    images = files#json.dumps(files)
    return images
getImages()
