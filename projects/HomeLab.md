---
layout: page
title: Home Lab ​🦇​
permalink: /projects/HomeLab/
---

Sooner or later I knew this moment would come, starting from now (March 2026) I will start my own Home Lab, therefore stay tuned beacuse I will update this page meanwhile I upgrade my Bat lab! 🦇​

## Why a Home Lab?

My curiosity about building a home lab started because many people I follow on YouTube have one. They always talk about it with a lot of enthusiasm and seem genuinely proud of having built their own environment from scratch. That made me want to understand what it really means to design and manage a personal infrastructure: starting from zero, studying the components involved, and gradually creating something that is truly mine.

A home lab also gives me a personal environment where I can experiment, learn, and make mistakes without causing real damage. 🦇​ I find it interesting to understand how to make different systems work together: Linux and Windows machines, firewalls, DNS filtering, VPNs, monitoring systems, and security tools. It allows me to have a safe playground where I can have fun without putting myself or others at risk.

To build this environment I chose Proxmox, a platform that is widely used and designed to transform a regular computer into a server capable of running multiple systems at the same time. It also provides useful features such as snapshots and backups, which make experimentation much safer because it’s always possible to revert changes if something goes wrong.🦇​

---

### Hypervisor

Proxmox is a **type-1 hypervisor**, meaning it runs directly on the hardware (often referred to as *bare metal*). This is different from tools like VirtualBox, which are **type-2 hypervisors** and run on top of another operating system.

An hypervisor’s role is to manage the physical resources of a computer — CPU, RAM, storage, and networking — and distribute them between multiple isolated systems.🦇​

---

### Virtual Machines (VM)

A **virtual machine**, or **VM**, is essentially a simulated computer. It behaves almost exactly like a real physical machine: it has its own operating system, virtual disk, memory allocation, and network interface.🦇​

One of the most important aspects of a VM is **isolation**, for example I can run a Kali Linux machine for security testing, a Windows machine for compatibility experiments, and a separate VM acting as a firewall — all on the same physical computer.

---

### Containers

A 🦇​ **container** is another type of isolated environment ideal when you want to run many small services efficiently, like Pi-Hole, without dedicating a full virtual machine to each one; because of this, containers start much faster and use fewer resources.

---

### Snapshots

A **snapshot** is essentially a saved state of a virtual machine at a specific moment in time. It captures the system’s configuration, disk state, and sometimes memory, allowing 🦇​ you to return to that exact point later, therefore it is essential when I will break the system.

---

Stay tuned! 🦇​🦇​🦇​