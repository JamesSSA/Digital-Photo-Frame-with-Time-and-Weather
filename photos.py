import json
import glob

usr_path = "/home/james/Programs/digitalFrame/"
dir = usr_path + "photos/"
def getImages():
    file_types = [dir + "*.jpg", dir +  "*.png", dir +  "*.svg", dir + "*.tif"]
    files = []
    for extension in file_types:
        for i in glob.glob(extension):
            i = i.replace(usr_path, '')
            files.append(i)
    with open("images.json", 'w') as outfile:
         json.dump(files, outfile);
    images = files#json.dumps(files)
    return images
getImages()
