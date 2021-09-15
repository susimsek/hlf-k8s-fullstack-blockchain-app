# Fullstack Blockchain Application running on Kubernetes
Blockchain Based Asset Transfer Application

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/hlf-k8s-fullstack-blockchain-app.png" alt="Fullstack Blockchain Application" width="100%" height="100%"/>

# Application Introduction

The asset transfer application can be accessed from this link.  
http://hlf-k8.tk

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/frontend1.png" alt="Fullstack Blockchain Application Introduction 1" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/frontend2.png" alt="Fullstack Blockchain Application Introduction 2" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/frontend3.png" alt="Fullstack Blockchain Application Introduction 3" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/frontend4.png" alt="Fullstack Blockchain Application Introduction 4" width="100%" height="100%"/>

# Swagger Introduction

The swagger ui can be accessed from this link.  
http://api.hlf-k8.tk/api-docs

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/backend1.png" alt="Fullstack Blockchain Application Swagger Introduction 1" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/backend2.png" alt="Fullstack Blockchain Application Swagger Introduction 2" width="100%" height="100%"/>

# Hyperledger Explorer Introduction

The hyperledger explorer dashboard can be accessed from this link.  
http://explorer.hlf-k8.tk

You can login to hyperledger explorer with these credentials.


| Username      | Password      | 
| ------------- |:-------------:| 
| admin         | adminpw       |

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/explorer1.png" alt="Fullstack Blockchain Application Hyperledger Explorer Introduction 1" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/explorer2.png" alt="Fullstack Blockchain Application Hyperledger Explorer Introduction 2" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/explorer3.png" alt="Fullstack Blockchain Application Hyperledger Explorer Introduction 3" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/explorer4.png" alt="Fullstack Blockchain Application Hyperledger Explorer Introduction 4" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/explorer5.png" alt="Fullstack Blockchain Application Hyperledger Explorer Introduction 5" width="100%" height="100%"/>

# Grafana Introduction

The grafana dashboard can be accessed from this link.  
http://grafana.hlf-k8.tk

You can login to grafana with these credentials.


| Username      | Password      | 
| ------------- |:-------------:| 
| admin         | adminpw       |


<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/grafana1.png" alt="Fullstack Blockchain Application Grafana Introduction 1" width="100%" height="100%"/>

<img src="https://github.com/susimsek/hlf-k8s-fullstack-blockchain-app/blob/main/images/grafana2.png" alt="Fullstack Blockchain Application Grafana Introduction 2" width="100%" height="100%"/>


## Prerequisites for Kubernetes Deployment

* Kubernetes 1.12+
* Nfs Server
* Ingress Controller

* Minimum 8 cpu
* Minimum 10 GB Ram

## Preparation for Kubernetes Deployment

Edit these files according to your nfs server configuration.

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
