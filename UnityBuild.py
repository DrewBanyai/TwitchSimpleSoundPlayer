import os
import os.path
import shutil
import time

indexFileLines = ""
addedFileData = ""

releaseFolder = "Release"
ProjectName = "TSSP"

# Ensure the "Release" folder exists and has the sounds folder copied over to it
if (os.path.isdir(releaseFolder) == True):
    shutil.rmtree(releaseFolder)
    time.sleep(1)
if (os.path.isdir(releaseFolder) == False):
    os.mkdir(releaseFolder)
shutil.copytree("Sounds", releaseFolder + "/Sounds")
shutil.copy("Settings.js", releaseFolder + "/Settings.js")

#  Open index.htm and read each line through, writing off what is needed
with open("./index.htm", "r", encoding="utf-8") as indexFP:
    indexFileLines = indexFP.readlines()
    with open(releaseFolder + "/" + ProjectName + ".htm", "w", encoding="utf-8") as releaseFP:
        releaseFP.truncate(0)
        for line in indexFileLines:
            # Check for local files and write them to addedFileData, then remove the line
            if (line.find("<!-- LOCAL -->") != -1):
                fileSrcStart = line.find("src=") + 5
                fileSrcEnd = line.find("></script>") - 1
                fileName = line[fileSrcStart:fileSrcEnd]
                with open("./" + fileName, "r", encoding="utf-8") as addFileFP:
                    newFileData = addFileFP.read()
                    addedFileData += newFileData
                    addedFileData += "\n\n"
                addFileFP.close()
                line = ""
            elif (line.find("<!-- CODE -->") != -1):
                releaseFP.write("<script>\n")
                releaseFP.write(addedFileData)
                releaseFP.write("</script>\n")
            elif (line.find("<!-- REMOVE -->") == -1):
                releaseFP.write(line)
    releaseFP.close()
indexFP.close()