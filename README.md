# Fullstack Blockchain Application running on Kubernetes
Blockchain Based Asset Transfer Application

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/hlf-k8s-fullstack-blockchain-app.png" alt="Fullstack Blockchain Application" width="100%" height="100%"/>

## Prerequisites for Kubernetes Deployment

* Kubernetes 1.12+
* Nfs Server
* Ingress Controller

* Minimum 8 cpu
* Minimum 10 GB Ram

## Preparation for Kubernetes Deployment

Edit these values in the following files according to your nfs server configuration.

Replace 192.168.12.9 with your nfs server ip

Replace /srv/kubedata with your nfs sharing path  

Paths of the files to be edited
```sh
deploy/k8s/pv/fabricfiles-pv.yaml
deploy/k8s/pv/kafka-pv.yaml
deploy/k8s/pv/zookeeper-pv.yaml
deploy/setup/copy_fabricfiles.sh
deploy/setup/create_fabric_dir.sh
```

Copy deploy folder to your nfs server.

Go the path of deploy folder,run these scripts on your nfs server.

```sh
cd deploy/setup/nfs-server-setup
```

```sh
sudo chmod u+x *.sh
```

```sh
./create_fabric_dir.sh
```

```sh
./copy_fabricfiles.sh
```

## Installation for Kubernetes Deployment

```sh
cd deploy/k8s
```

```sh
sudo chmod u+x *.sh
```

```sh
./install.sh
```

## Installation Using Vagrant for Kubernetes Deployment

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/vagrant-k8s-installation.png" alt="Fullstack Blockchain Application Vagrant Installation" width="100%" height="100%"/> 

### Prerequisites for Kubernetes Deployment

* Vagrant 2.2+
* Virtualbox or Hyperv
* Minimum 8 cpu
* Minimum 10 GB Ram

### Virtual Machine Setup

```sh
cd deploy
```

```sh
vagrant up
```

### Nfs Server Installation

```sh
vagrant ssh nfserver
```

```sh
cd /vagrant/setup/nfs-server-setup
```

```sh
sudo chmod u+x *.sh
```

```sh
sudo ./install_nfs.sh
```

```sh
./create_fabric_dir.sh
```

```sh
./copy_fabricfiles.sh
```

```sh
exit
```

### Haproxy Installation

```sh
vagrant ssh haproxy
```

```sh
cd /vagrant/setup/haproxy-setup
```

```sh
sudo chmod u+x *.sh
```

```sh
sudo ./install-prereqs.sh
```

```sh
exit
```

### Kubernetes Installation

```sh
vagrant ssh k8smaster
```

```sh
 cd /vagrant/setup/kubernetes-setup
```

```sh
sudo chmod u+x *.sh
```

```sh
./install-prereqs.sh
```


### Application Installation

```sh
cd /vagrant/k8s
```

```sh
sudo chmod u+x *.sh
```

```sh
./install.sh
```
