from odoo import http

from odoo.addons.website_sale.controllers.main import WebsiteSale

class Academy(http.Controller):

    @http.route('/academy/academy/', auth='public', website=True)
    def index(self, **kw):
        Teachers  = http.request.env['openacademy.teachers']
        return http.request.render(
            'openacademy.index',
            {'teachers': Teachers.search([])})


    @http.route('/academy/<model("openacademy.teachers"):teacher>', auth='public', website=True)
    def teacher2(self, teacher):
        return http.request.render('openacademy.biografy',{'person':teacher})

class WebsiteSaleInh(WebsiteSale):
    @http.route()
    def shop(self, page = 0, category = None, search = "", ppg= False, **post):
        print("Testing")
        res = super(WebsiteSaleInh, self).shop(page=page, category = category, search= search, ppg = ppg, **post)
        res.qcontext['search'] = 'ipad'
        res.qcontext['categories'] = res.qcontext['categories'].sorted(key = lambda r:r.name)
        res.qcontext['products'] = res.qcontext['products'].sorted(key = lambda r:r.name)

        return res
