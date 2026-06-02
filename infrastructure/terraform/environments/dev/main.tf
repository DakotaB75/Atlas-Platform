module "resource_group" {

  source = "../../modules/resource-group"

  resource_group_name = var.resource_group_name

  location = var.location

}

module "container_registry" {

  source = "../../modules/container-registry"

  acr_name = var.acr_name

  resource_group_name = module.resource_group.name

  location = module.resource_group.location

}

module "postgres" {

  source = "../../modules/postgres"

  server_name = var.postgres_name

  resource_group_name = module.resource_group.name

  location = module.resource_group.location

  admin_username = "atlasadmin"

  admin_password = "ChangeMe123!"
}

module "redis" {

  source = "../../modules/redis"

  redis_name = var.redis_name

  resource_group_name = module.resource_group.name

  location = module.resource_group.location
}

module "monitoring" {

  source = "../../modules/monitoring"

  resource_group_name = module.resource_group.name

  location = module.resource_group.location
}