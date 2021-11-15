#!/usr/bin/env node

const { execSync } = require( 'child_process' );
const path = require( 'path' );
const fs = require( 'fs' );

console.log( "Creating Chatpta Express Api" )

if ( process.argv.length < 3 ) {
    console.log( 'You have to provide a name to your app.' );
    console.log( 'For example :' );
    console.log( '    npx create-express-api my-app' );
    process.exit( 1 );
}

// Create variables
const projectName = process.argv[ 2 ];
const currentPath = process.cwd();
const projectPath = path.join( currentPath, projectName );
const git_repo = "https://github.com/chatpta/starter-api-express.git";

// Verify git repository exist
try {
    fs.mkdirSync( projectPath );
} catch ( err ) {
    if ( err.code === 'EEXIST' ) {
        console.log( `\nThe file ${ projectName } already exist in the current directory, please give it another name.` );
    } else {
        console.log( err );
    }
    process.exit( 1 );
}

// Create api application
async function main() {
    try {
        console.log( '\nDownloading files...' );
        execSync( `git clone --depth 1 ${ git_repo } ${ projectPath }` );

        process.chdir( projectPath );

        console.log( '\nInstalling dependencies...' );
        execSync( 'npm install' );

        console.log( '\nRemoving useless files' );
        fs.rmSync( path.join( projectPath, '.git' ), { recursive: true } );

        console.log( `\nThe installation is done,${ projectName } is ready to use !\n` );

    } catch ( error ) {
        console.log( error );
    }
}

main().catch( console.error );
