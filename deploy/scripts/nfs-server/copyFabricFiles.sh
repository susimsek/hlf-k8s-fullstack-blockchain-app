#!/bin/bash

NFS_DIR=/mnt/nfs_share
TARGET_PATH=$NFS_DIR/fabricfiles
FABRIC_FILES_PATH=/mnt/nfs_share/hlf-kubernetes/deploy/k8s/fabricfiles

# Functions #########################################################################

function copy_fabricfiles(){
echo "## Copied fabric files"    
echo
sudo cp -a $FABRIC_FILES_PATH/. $TARGET_PATH/
}

# Let's go ###################################################################################
copy_fabricfiles