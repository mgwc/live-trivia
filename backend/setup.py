from setuptools import find_packages, setup

setup(
    name='trivia',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,      # Tells Python to include files outside of package directories; MANIFEST.in file specifies which (usually includes static files, templates, etc.)
    zip_safe=False,
    install_requires=[
        'flask',
    ],
)