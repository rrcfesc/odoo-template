from odoo import api, models, fields

class Teachers(models.Model):
    _name = "openacademy.teachers"
    name = fields.Char()