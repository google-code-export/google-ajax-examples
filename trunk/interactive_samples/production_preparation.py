import os
# have to copy all files to the new directory
# have to delete the .svn directories
os.system('mkdir ../interactive_copy')
os.system('cp -R * ../interactive_copy')
