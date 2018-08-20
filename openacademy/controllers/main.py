from odoo import http

class Academy(http.Controller):

    @http.route('/academy/academy/', auth='public')
    def index(self, **kw):
        Teachers  = http.request.env['openacademy.teachers']
        return http.request.render(
            'openacademy.index',
            {'teachers': Teachers.search([])})
