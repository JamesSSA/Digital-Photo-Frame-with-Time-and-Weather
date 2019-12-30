import json
import glob

# dir = "/home/james/Programs/digitalPhotos/photos"
def getImages():
    file_types = ["*.jpg", "*.png", "*.svg", "*.tif"]
    files = []
    for extension in file_types:
        files.extend("photo/" + glob.glob(extension))
    # with open("images.json", 'wb') as outfile:
        # json.dump(files, outfile);
    images = json.dumps(files)
    return images
