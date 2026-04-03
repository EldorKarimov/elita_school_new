from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        # name
        migrations.AddField(
            model_name='sitesettings',
            name='name_uz',
            field=models.CharField(default='ELITA AKADEMIK MAKTABI', max_length=50, null=True, verbose_name='Maktab nomi'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='name_ru',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Maktab nomi'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='name_en',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Maktab nomi'),
        ),
        # slogan
        migrations.AddField(
            model_name='sitesettings',
            name='slogan_uz',
            field=models.CharField(default="Ilmdan o'zga najot yo'q", max_length=50, null=True, verbose_name='Maktab shiori'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='slogan_ru',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Maktab shiori'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='slogan_en',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Maktab shiori'),
        ),
        # address
        migrations.AddField(
            model_name='sitesettings',
            name='address_uz',
            field=models.CharField(max_length=255, null=True, verbose_name='Manzil'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='address_ru',
            field=models.CharField(max_length=255, null=True, blank=True, verbose_name='Manzil'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='address_en',
            field=models.CharField(max_length=255, null=True, blank=True, verbose_name='Manzil'),
        ),
        # reception
        migrations.AddField(
            model_name='sitesettings',
            name='reception_uz',
            field=models.CharField(default='Dushanba-Juma: 8:30 - 16:30', max_length=50, null=True, verbose_name='Qabul vaqti'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='reception_ru',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Qabul vaqti'),
        ),
        migrations.AddField(
            model_name='sitesettings',
            name='reception_en',
            field=models.CharField(max_length=50, null=True, blank=True, verbose_name='Qabul vaqti'),
        ),
    ]
