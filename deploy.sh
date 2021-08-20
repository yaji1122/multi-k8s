docker build -t yajilin/multi-client:latest -t yajilin/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t yajilin/multi-server:latest -t yajilin/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t yajilin/multi-worker:latest -t yajilin/multi-server:$SHA -f ./worker/Dockerfile ./worker

docker push yajilin/multi-client:latest
docker push yajilin/multi-server:latest
docker push yajilin/multi-worker:latest

docker push yajilin/multi-client:$SHA
docker push yajilin/multi-server:$SHA
docker push yajilin/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployment/server-deployment server=yajilin/multi-server:$SHA
kubectl set image deployment/client-deployment client=yajilin/multi-client:$SHA
kubectl set image deployment/worker-deployment worker=yajilin/multi-worker:$SHA
