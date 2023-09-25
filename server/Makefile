# Переменные
IMAGE_NAME := finances
CONTAINER_NAME := finances_container
PORT := 3000

# Построение образа
build:
	docker build -t $(IMAGE_NAME) .

# Запуск контейнера
run:
	docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

deploy: build run

# Остановка и удаление контейнера
stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Остановка, удаление контейнера и перестроение образа
clean: stop
	docker rmi $(IMAGE_NAME) || true

# Перезапуск контейнера (полезно, если вам нужно обновить приложение)
restart: clean deploy
