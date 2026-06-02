resource "azurerm_postgresql_flexible_server" "this" {

  name                = var.server_name
  resource_group_name = var.resource_group_name
  location            = var.location

  administrator_login    = var.admin_username
  administrator_password = var.admin_password

  sku_name   = "B_Standard_B1ms"
  version    = "16"

  storage_mb = 32768
}