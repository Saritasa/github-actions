var fs = require('fs');
var glob = require('glob-fs')();
var xml2js = require('xml2js');

function updateDotnetProjectFiles(globPattern, version) {
    console.log('Updating .NET project files...');

    const files = glob.readdirSync(globPattern);
    files.forEach(file => updateProjectVersion(file, version));

    console.log('Done.')
}

function updateProjectVersion(projectFileName, version) {
    console.log(`${projectFileName} -> ${version}`);

    const projectContent = fs.readFileSync(projectFileName).toString();

    const parser = new xml2js.Parser();
    parser.parseString(projectContent, function (err, result) {
        result.Project.PropertyGroup[0].Version = version;

        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);

        fs.writeFileSync(projectFileName, xml);
    });
}

exports.updateDotnetProjectFiles = updateDotnetProjectFiles;
