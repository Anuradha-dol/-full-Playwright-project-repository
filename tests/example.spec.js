const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// ==================== Test Cases ====================
const testCases = [
// ========= POSITIVE TEST CASES (24) =========
{
id: 'Pos_Fun_001',
name: 'Convert simple present tense daily action sentence',
input: 'mama gedhara yanavaa.',
expected: 'මම ගෙදර යනවා.',
length: 'S',
category: 'Daily language usage • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_002',
name: 'Simple sentence with object',
input: 'mata bath oonee.',
expected: 'මට බත් ඕනේ.',
length: 'S',
category: 'Daily language usage • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_003',
name: 'Compound sentence',
input: 'api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.',
expected: 'අපි කැම කන්න යනවා සහ පස්සේ චිත්රපටයකුත් බලනවා.',
length: 'M',
category: 'Word combination / phrase pattern • Compound sentence • M (31–299 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_004',
name: 'Complex sentence with condition',
input: 'oyaa enavaanam mama balan innavaa.',
expected: 'ඔයා එනවානම් මම බලන් ඉන්නවා.',
length: 'M',
category: 'Daily language usage • Complex sentence • M (31–299 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_005',
name: 'Interrogative question',
input: 'oyaata kohomadha?',
expected: 'ඔයාට කොහොමද?',
length: 'S',
category: 'Greeting / request / response • Interrogative (question) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_006',
name: 'Imperative command',
input: 'vahaama enna.',
expected: 'වහාම එන්න.',
length: 'S',
category: 'Daily language usage • Imperative (command) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_007',
name: 'Positive sentence form',
input: 'api heta enavaa.',
expected: 'අපි හෙට එනවා.',
length: 'S',
category: 'Daily language usage • Future tense • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_008',
name: 'Negative sentence form',
input: 'api heta ennee naehae.',
expected: 'අපි හෙට එන්නේ නැහැ.',
length: 'S',
category: 'Daily language usage • Negation (negative form) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_009',
name: 'Common greeting',
input: 'suba udhaeesanak!',
expected: 'සුභ උදෑසනක්!',
length: 'S',
category: 'Greeting / request / response • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_010',
name: 'Polite request',
input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?',
expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?',
length: 'M',
category: 'Greeting / request / response • Interrogative (question) • M (31–299 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_011',
name: 'Informal phrasing',
input: 'eeyi, ooka dhiyan.',
expected: 'එයි, ඕක දියන්.',
length: 'S',
category: 'Slang / informal language • Imperative (command) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_012',
name: 'Daily expression',
input: 'mata baya hithenavaa.',
expected: 'මට බය හිතෙනවා.',
length: 'S',
category: 'Daily language usage • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_013',
name: 'Multi-word expression',
input: 'mata oona',
expected: 'මට ඕන',
length: 'S',
category: 'Word combination / phrase pattern • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_014',
name: 'Past tense sentence',
input: 'mama iiyee gedhara giyaa.',
expected: 'මම ඊයේ ගෙදර ගියා.',
length: 'S',
category: 'Daily language usage • Past tense • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_015',
name: 'Future tense sentence',
input: 'mama heta enavaa.',
expected: 'මම හෙට එනවා.',
length: 'S',
category: 'Daily language usage • Future tense • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_016',
name: 'Negation pattern',
input: 'mata eeka epaa.',
expected: 'මට එක එපා.',
length: 'S',
category: 'Daily language usage • Negation (negative form) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_017',
name: 'Singular pronoun',
input: 'mama yanna hadhannee.',
expected: 'මම යන්න හදන්නේ.',
length: 'S',
category: 'Daily language usage • Pronoun variation (I/you/we/they) • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_018',
name: 'Plural pronoun',
input: 'api yamu.',
expected: 'අපි යමු.',
length: 'S',
category: 'Daily language usage • Plural form • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_019',
name: 'Mixed English technical term',
input: 'Zoom meeting ekak thiyennee.',
expected: 'Zoom meeting එකක් තියෙන්නේ.',
length: 'M',
category: 'Mixed Singlish + English • Simple sentence • M (31–299 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_020',
name: 'With punctuation',
input: 'hari, mama karannam!',
expected: 'හරි, මම කරන්නම්!',
length: 'S',
category: 'Punctuation / numbers • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_021',
name: 'Currency format',
input: 'Rs. 5343',
expected: 'රු. 5343',
length: 'S',
category: 'Punctuation / numbers • Simple sentence • S (≤30 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_022',
name: 'Short slang expression',
input: 'ela machan! supiri!!',
expected: 'එල මචන්! සුපිරි!!',
length: 'S',
category: 'Slang / informal language • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Pos_Fun_023',
name: 'Medium length sentence',
input: 'mama gedhara yanavaa. mama ofise enavaa. mama vadakaranna yanavaa.',
expected: 'මම ගෙදර යනවා. මම ඔෆිස් එනවා. මම වැඩකරන්න යනවා.',
length: 'M',
category: 'Daily language usage • Simple sentence • M (31–299 characters) • Accuracy validation'
},
{
id: 'Pos_Fun_024',
name: 'Long paragraph input',
input: 'udheeta mama kaempas ekata yanavaa. gihin lekchars gihin dhavalta kaeema kaala oyi paeththata ennam ethakota puluvan maath ekkama raeeta kotuve paeththe gihin enna . matath nivaduvak naethi ekee raekatavath gihin enna yamu.godaak raeevunath avulak naehaenee . iita passe udhee naegitalaa vaedata yana ekanee karanna thinne needha?ehenam heta 5:30 vedhdhi set vemu aevilla inna ithuru tika api heta kathaa karamu bosaa. ehenam mama gihin ennam . heta ehenam anivaaren enna. ',
expected: 'උදේට මම කැම්පස් එකට යනවා. ගිහින් ලෙක්චර්ස් ගිහින් දවල්ට කෑම කාල ඔයි පැත්තට එන්නම් එතකොට පුලුවන් මාත් එක්කම රෑට කොටුවෙ පැත්තෙ ගිහින් එන්න . මටත් නිවඩුවක් නැති එකේ රැකටවත් ගිහින් එන්න යමු.ගොඩාක් රෑවුනත් අවුලක් නැහැනේ . ඊට පස්සෙ උදේ නැගිටලා වැඩට යන එකනේ කරන්න තින්නෙ නේද?එහෙනම් හෙට 5:30 වෙද්දි සෙට් වෙමු ඇවිල්ල ඉන්න ඉතුරු ටික අපි හෙට කතා කරමු බොසා. එහෙනම් මම ගිහින් එන්නම් . හෙට එහෙනම් අනිවාරෙන් එන්න. ',
length: 'L',
category: 'Formatting (spaces / line breaks / paragraph) • Compound sentence • L (≥300 characters) • Robustness validation'
},

// ========= NEGATIVE TEST CASES (10) =========
{
id: 'Neg_Fun_001',
name: 'Joined words without spaces',
input: 'mamagedharayanavaa',
expected: 'මමගෙදරයනවා',
length: 'S',
category: 'Word combination / phrase pattern • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_002',
name: 'Mixed case Singlish',
input: 'MaMa GeDhArA YaNaVaA.',
expected: 'මම ගෙදර යනවා.',
length: 'S',
category: 'Typographical error handling • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_003',
name: 'Misspelled Singlish word',
input: 'mama gedara yanwa.',
expected: 'මම ගෙදර යනවා',
length: 'S',
category: 'Typographical error handling • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_004',
name: 'English abbreviation FYI',
input: 'FYI, mata eeka hari.',
expected: 'FYI, මට එක හරි.',
length: 'S',
category: 'Mixed Singlish + English • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_005',
name: 'Uncommon slang phrase',
input: 'adoo vaedak baaragaththaanam',
expected: 'අඩෝ වැඩක් බාරගත්තානම්',
length: 'M',
category: 'Slang / informal language • Simple sentence • M (31–299 characters) • Robustness validation'
},
{
id: 'Neg_Fun_006',
name: 'Mixed language incorrect structure',
input: 'I mama going gedhara now.',
expected: 'I මම going ගෙදර now.',
length: 'S',
category: 'Mixed Singlish + English • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_007',
name: 'Repeated words for emphasis',
input: 'hari hari kiyala kiyavala',
expected: 'හරි හරි කියල කියවල',
length: 'S',
category: 'Word combination / phrase pattern • Simple sentence • S (≤30 characters) • Robustness validation'
},
{
id: 'Neg_Fun_008',
name: 'Non-standard abbreviation',
input: 'mama O/L exam ekata padanam.',
expected: 'මම O/L exam එකට පඩනම්.',
length: 'M',
category: 'Mixed Singlish + English • Simple sentence • M (31–299 characters) • Robustness validation'
},
{
id: 'Neg_Fun_009',
name: 'Text with line breaks',
input: 'mama gedhara yanavaa.\noyaa enavadha?',
expected: 'මම ගෙදර යනවා.\nඔයා එනවද?',
length: 'M',
category: 'Formatting (spaces / line breaks / paragraph) • Compound sentence • M (31–299 characters) • Robustness validation'
},
{
id: 'Neg_Fun_010',
name: 'Very long concatenated word',
input: 'mamagedharayannakotapasseofficeataennakotapassekotahagenaenava',
expected: 'මමගෙදරයන්නකොටපස්සෙඔෆිස්අටෙන්නකොටපස්සෙකොටහගෙනෙනවා',
length: 'L',
category: 'Word combination / phrase pattern • Simple sentence • L (≥300 characters) • Robustness validation'
},

// ========= UI TEST CASE (1) =========
{
id: 'Pos_UI_001',
name: 'Real-time output update',
input: 'mama gedhara yanavaa',
expected: 'මම ගෙදර යනවා',
length: 'S',
category: 'Empty/cleared input handling • Simple sentence • S (≤30 characters) • Real-time output update behavior'
}
];

// ==================== Helper Functions ====================
async function getInputField(page) {
    const selectors = [
        'textarea',
        'input[type="text"]',
        'input',
        '[placeholder*="Singlish"]',
        '[placeholder*="singlish"]',
        '[placeholder*="Type"]',
        '[contenteditable="true"]'
    ];

    for (const sel of selectors) {
        const elements = await page.locator(sel);
        const count = await elements.count();
        if (count > 0) {
            return elements.first();
        }
    }

    throw new Error('Input field not found');
}

async function getSinhalaOutput(page) {
    // Only look at likely elements instead of '*'
    const elements = await page.locator('textarea, input, div, span, p').all();
    let longest = '';
    for (const el of elements) {
        const text = (await el.textContent())?.trim();
        if (text && /[\u0D80-\u0DFF]/.test(text) && text.length > longest.length) {
            longest = text;
        }
    }

    if (longest) return longest;

    // Fallback: textarea
    const textareas = await page.locator('textarea').all();
    for (const ta of textareas) {
        const val = await ta.inputValue();
        if (val && /[\u0D80-\u0DFF]/.test(val)) return val.trim();
    }

    // Fallback: input
    const inputs = await page.locator('input').all();
    for (const inp of inputs) {
        const val = await inp.inputValue();
        if (val && /[\u0D80-\u0DFF]/.test(val)) return val.trim();
    }

    return 'No Sinhala output found';
}


// Wait dynamically until Sinhala text appears
async function waitForSinhalaOutput(page, timeout = 10000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const output = await getSinhalaOutput(page);
        if (output && output !== 'No Sinhala output found') {
            return output;
        }
        await page.waitForTimeout(300); // short poll interval
    }
    return 'No Sinhala output found';
}

// ==================== Test Suite ====================
test.describe('Singlish Translator Tests - Assignment 1', () => {
    const resultsDir = path.join(__dirname, 'results');
    const screenshotsDir = path.join(__dirname, 'screenshots');

    let results = [];

    if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500); // brief stabilization
    });

    for (const tc of testCases) {
        test(tc.name, async ({ page }) => {
            let actualOutput = '';
            let status = 'Fail';
            let errorMessage = '';

            try {
                const inputField = await getInputField(page);

                // Clear input reliably
                await inputField.fill('');

                // Type input
                await inputField.type(tc.input, { delay: 30 });

                // Wait dynamically for Sinhala output
                const waitTime = tc.length === 'L' ? 15000 : 7000; // max timeout
                actualOutput = await waitForSinhalaOutput(page, waitTime);

                // Determine pass/fail
                if (tc.id.startsWith('Pos_Fun') || tc.id.startsWith('Pos_UI')) {
                    const cleanActual = actualOutput.replace(/[^\u0D80-\u0DFF]/g, '').normalize('NFC');
                    const cleanExpected = tc.expected.replace(/[^\u0D80-\u0DFF]/g, '').normalize('NFC');

                    if (cleanActual === cleanExpected || cleanActual.includes(cleanExpected) || cleanExpected.includes(cleanActual)) {
                        status = 'Pass';
                    } else {
                        status = 'Fail';
                    }
                } else if (tc.id.startsWith('Neg_Fun')) {
                    if (actualOutput !== tc.expected && actualOutput !== 'No Sinhala output found') {
                        status = 'Pass';
                    } else {
                        status = 'Fail';
                    }
                }

            } catch (error) {
                errorMessage = error.message;
                actualOutput = `ERROR: ${error.message}`;
                status = 'Fail';
            }

            // Save result
            results.push({
                'TC ID': tc.id,
                'Test case name': tc.name,
                'Input length type': tc.length,
                'Input': tc.input,
                'Expected output': tc.expected,
                'Actual output': actualOutput,
                'Status': status,
                'Accuracy justification/Description of issue type': errorMessage || (status === 'Pass' ? 'Correct conversion' : 'Incorrect conversion'),
                'What is covered by the test': tc.category
            });

            // Screenshot only for failures
            if (status === 'Fail') {
                try {
                    await page.screenshot({ path: path.join(screenshotsDir, `${tc.id}.png`), fullPage: false });
                } catch (screenshotError) {
                    console.log(`Could not take screenshot for ${tc.id}: ${screenshotError.message}`);
                }
            }
        });
    }

    test.afterAll(async () => {
        // Summary
        const summary = {
            total: results.length,
            passed: results.filter(r => r.Status === 'Pass').length,
            failed: results.filter(r => r.Status === 'Fail').length,
            timestamp: new Date().toISOString()
        };

        fs.writeFileSync(path.join(resultsDir, 'test_summary.json'), JSON.stringify(summary, null, 2));

        const csvHeader = Object.keys(results[0]).join(',');
        const csvRows = results.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
        fs.writeFileSync(path.join(resultsDir, 'test_results.csv'), [csvHeader, ...csvRows].join('\n'));

        fs.writeFileSync(path.join(resultsDir, 'test_results.json'), JSON.stringify(results, null, 2));

        console.log('\nResults saved to:');
        console.log(`- ${path.join(resultsDir, 'test_summary.json')}`);
        console.log(`- ${path.join(resultsDir, 'test_results.csv')}`);
        console.log(`- ${path.join(resultsDir, 'test_results.json')}`);
        console.log(`Screenshots saved to: ${screenshotsDir}`);
    });
});
