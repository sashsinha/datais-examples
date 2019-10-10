#!/usr/bin/env python

import argparse
import cairosvg
import ntpath
import os
import shutil
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description='Converts SVG to DZI. Requires imagemagick, cairosvg, \
        magick-slicer.sh, and optionally svgexport and each of their associated dependencies to be installed beforehand.')
    parser.add_argument('infile', type=str, help='input SVG file')
    parser.add_argument('scale_factor', type=int, help='scale factor to increase by before converting to DZI')
    parser.add_argument('-s', '--svgexport', action='store_true',
                        help='Use the npm package svgexport rather than cairosvg', dest='svgexport')
    args = parser.parse_args()

    infile = args.infile
    scale_factor = args.scale_factor
    use_svgexport = args.svgexport

    # Check if ./magick-slicer.sh exists in same directory as script
    if not os.path.isfile('./magick-slicer.sh'):
        sys.exit('Error: The file ./magick-slicer.sh needs to be in same folder as this script.')

    # Check if file exists
    if not os.path.isfile(infile):
        sys.exit('Error: The file {infile} was not found')

    # Check if file ends with svg extention
    # TODO: Check file is a valid SVG
    if not infile.endswith('.svg'):
        sys.exit('Error: The file {infile} is not an SVG')

    infile_name = path_leaf(infile)
    base_file_name = infile_name[:-4]
    upscaled_png = f'{base_file_name}_{scale_factor}x.png'
    output_directory = os.path.dirname(infile)
    out_png_filepath = os.path.join(output_directory, upscaled_png)

    # Convert SVG to scaled PNG
    print(f'Converting {infile_name} to {upscaled_png}...')
    if not use_svgexport:
        cairosvg.svg2png(url=infile, write_to=f'{out_png_filepath}', scale=scale_factor)
    else:
        subprocess.check_output(['svgexport', infile, out_png_filepath, f'{scale_factor}x'])

    print('Done.')
    print(f'Output file: {out_png_filepath}')

    # Use magicslicer.sh to convert scaled PNG to DZI
    dzi_file_name = f"{base_file_name}_{scale_factor}x.dzi"
    dzi_associated_files = f"{base_file_name}_{scale_factor}x_files"
    print(f'Converting {upscaled_png} to {dzi_file_name} and its associated files...')
    subprocess.check_output(['./magick-slicer.sh', out_png_filepath])
    print('Done')
    # Move generated DZI file
    shutil.move(dzi_file_name, f'{output_directory}/{dzi_file_name}')
    # Move associated files
    shutil.move(dzi_associated_files, f'{output_directory}/{dzi_associated_files}')
    print(f'Output folder: {output_directory}')

    # Creating example static openseadragon html file
    print('Creating example static openseadragon html file')
    openseadragon_html_file = f'{output_directory}/{base_file_name}.html'
    with open(openseadragon_html_file, 'w') as out_html_file:
        out_html_file.write(create_openseadragon_html_file(base_file_name, dzi_file_name))
    print('Done')
    print(f'Output file: {openseadragon_html_file}')


def path_leaf(path):
    """
    Returns just file name from path
    """
    head, tail = ntpath.split(path)
    return tail or ntpath.basename(head)


def create_openseadragon_html_file(base_file_name, dzi_file_name):
    page_title = ' '.join(map(str.title, base_file_name.split('_')))
    return f"""\
<html>

<head>
    <title>{page_title}</title>
</head>

<body>
    <div id="openseadragon" style="width: 500px; height: 500px;"></div>
    <script src="openseadragon.min.js"></script>
    <script id="openseadragonScript" type="text/javascript">
        var viewer = OpenSeadragon({{
            id: "openseadragon",
            prefixUrl: "https://raw.githubusercontent.com/shash678/datais-examples/gh-pages/visualizations/deep_zoom_controls/",
            tileSources: "https://raw.githubusercontent.com/shash678/datais-examples/gh-pages/visualizations/{dzi_file_name}",
            showFullPageControl: true
        }});
    </script>
</body>

</html>
"""


if __name__ == '__main__':
    main()
