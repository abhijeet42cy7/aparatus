// Test script for A_OCR Chatbot deployment
// Run with: node test-deployment.js [URL]

const https = require('https');
const http = require('http');

const DEFAULT_URL = 'http://localhost:8787'; // Default for local development
const TEST_URL = process.argv[2] || DEFAULT_URL;

console.log('🧪 Testing A_OCR Chatbot Deployment');
console.log('===================================');
console.log(`Testing URL: ${TEST_URL}`);
console.log('');

// Test cases
const tests = [
    {
        name: 'Health Check (GET /)',
        method: 'GET',
        path: '/',
        expectedStatus: 200
    },
    {
        name: 'Detailed Health Check (GET /health)',
        method: 'GET',
        path: '/health',
        expectedStatus: 200
    },
    {
        name: 'Available Pages (GET /pages)',
        method: 'GET',
        path: '/pages',
        expectedStatus: 200
    },
    {
        name: 'Chat API (POST /chat)',
        method: 'POST',
        path: '/chat',
        body: {
            message: 'Hello, I need help with OCR services',
            page_id: 'home'
        },
        expectedStatus: 200
    },
    {
        name: 'Chat API with Services Page Context',
        method: 'POST',
        path: '/chat',
        body: {
            message: 'What OCR services do you offer?',
            page_id: 'services'
        },
        expectedStatus: 200
    },
    {
        name: 'Invalid Message (Empty)',
        method: 'POST',
        path: '/chat',
        body: {
            message: '',
            page_id: 'home'
        },
        expectedStatus: 400
    },
    {
        name: 'Invalid Message (Too Long)',
        method: 'POST',
        path: '/chat',
        body: {
            message: 'A'.repeat(2000), // Exceeds default 1000 char limit
            page_id: 'home'
        },
        expectedStatus: 400
    },
    {
        name: '404 Test (Unknown Endpoint)',
        method: 'GET',
        path: '/unknown',
        expectedStatus: 404
    }
];

// Helper function to make HTTP requests
function makeRequest(url, options) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const isHttps = urlObj.protocol === 'https:';
        const client = isHttps ? https : http;
        
        const requestOptions = {
            hostname: urlObj.hostname,
            port: urlObj.port || (isHttps ? 443 : 80),
            path: urlObj.pathname,
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        const req = client.request(requestOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = data ? JSON.parse(data) : {};
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: jsonData
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: data
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (options.body) {
            req.write(JSON.stringify(options.body));
        }

        req.end();
    });
}

// Run a single test
async function runTest(test) {
    try {
        const url = `${TEST_URL}${test.path}`;
        const response = await makeRequest(url, {
            method: test.method,
            body: test.body
        });

        const passed = response.status === test.expectedStatus;
        const status = passed ? '✅ PASS' : '❌ FAIL';
        
        console.log(`${status} ${test.name}`);
        console.log(`   Expected: ${test.expectedStatus}, Got: ${response.status}`);
        
        if (test.body && test.method === 'POST') {
            console.log(`   Request: ${JSON.stringify(test.body, null, 2)}`);
        }
        
        if (response.data && typeof response.data === 'object') {
            if (response.data.error) {
                console.log(`   Error: ${response.data.error}`);
            } else if (response.data.response) {
                console.log(`   Response: ${response.data.response.substring(0, 100)}...`);
            } else if (response.data.status) {
                console.log(`   Status: ${response.data.status}`);
            }
        }
        
        console.log('');
        return passed;
    } catch (error) {
        console.log(`❌ FAIL ${test.name}`);
        console.log(`   Error: ${error.message}`);
        console.log('');
        return false;
    }
}

// Run all tests
async function runAllTests() {
    console.log('Starting tests...\n');
    
    let passed = 0;
    let total = tests.length;
    
    for (const test of tests) {
        const result = await runTest(test);
        if (result) passed++;
    }
    
    console.log('Test Results Summary');
    console.log('===================');
    console.log(`Passed: ${passed}/${total}`);
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);
    
    if (passed === total) {
        console.log('\n🎉 All tests passed! Your chatbot is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Please check the configuration and try again.');
    }
}

// Run the tests
runAllTests().catch(console.error);
