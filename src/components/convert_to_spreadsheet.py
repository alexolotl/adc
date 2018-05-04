import os

from django.core.management.base import BaseCommand, CommandError
from wand.image import Image

from openpyxl import Workbook

class Command(BaseCommand):
    # args = '<file_location>'
    help = 'Converts data to spreadsheet'

    def handle(self, filename, *args, **options):
        try:
            data = [['one', 'two', 'three', 'four'], [1, 2, 3, 4]]
            wb = Workbook()
            ws = wb.active
            for row in data:
                ws.append(row)
            wb.save('example.xlsx')
        except Exception as e:
            raise CommandError(e.message)
