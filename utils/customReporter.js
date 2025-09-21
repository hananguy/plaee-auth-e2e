/**
 * Custom Test Reporter
 * Provides detailed test reporting and analytics
 */

import fs from 'fs';
import path from 'path';

/**
 * Custom HTML Reporter
 */
export class CustomHTMLReporter {
  constructor(options = {}) {
    this.outputDir = options.outputDir || 'test-results';
    this.reportName = options.reportName || 'custom-report.html';
  }

  /**
   * Generate HTML report
   * @param {Array} results - Test results
   */
  generateReport(results) {
    const html = this.generateHTML(results);
    const reportPath = path.join(this.outputDir, this.reportName);
    
    fs.writeFileSync(reportPath, html);
    console.log(`📊 Custom report generated: ${reportPath}`);
  }

  /**
   * Generate HTML content
   * @param {Array} results - Test results
   * @returns {string} HTML content
   */
  generateHTML(results) {
    const stats = this.calculateStats(results);
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Report - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .test-results { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-item { padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
        .test-item:last-child { border-bottom: none; }
        .test-name { font-weight: bold; }
        .test-status { padding: 4px 8px; border-radius: 4px; font-size: 0.8em; }
        .status-passed { background: #d4edda; color: #155724; }
        .status-failed { background: #f8d7da; color: #721c24; }
        .status-skipped { background: #fff3cd; color: #856404; }
        .duration { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 Test Execution Report</h1>
        <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="stats">
        <div class="stat-card">
            <div class="stat-number passed">${stats.passed}</div>
            <div>Passed</div>
        </div>
        <div class="stat-card">
            <div class="stat-number failed">${stats.failed}</div>
            <div>Failed</div>
        </div>
        <div class="stat-card">
            <div class="stat-number skipped">${stats.skipped}</div>
            <div>Skipped</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.total}</div>
            <div>Total</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.duration}</div>
            <div>Duration (ms)</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.successRate}%</div>
            <div>Success Rate</div>
        </div>
    </div>
    
    <div class="test-results">
        <h2>Test Results</h2>
        ${this.generateTestList(results)}
    </div>
</body>
</html>`;
  }

  /**
   * Calculate test statistics
   * @param {Array} results - Test results
   * @returns {Object} Statistics
   */
  calculateStats(results) {
    const stats = {
      total: results.length,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      successRate: 0,
    };

    results.forEach(result => {
      stats[result.status]++;
      stats.duration += result.duration || 0;
    });

    stats.successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
    
    return stats;
  }

  /**
   * Generate test list HTML
   * @param {Array} results - Test results
   * @returns {string} HTML content
   */
  generateTestList(results) {
    return results.map(result => `
      <div class="test-item">
        <div class="test-name">${result.title}</div>
        <div>
          <span class="test-status status-${result.status}">${result.status.toUpperCase()}</span>
          <span class="duration">${result.duration || 0}ms</span>
        </div>
      </div>
    `).join('');
  }
}

/**
 * JSON Reporter
 */
export class JSONReporter {
  constructor(options = {}) {
    this.outputDir = options.outputDir || 'test-results';
    this.reportName = options.reportName || 'test-results.json';
  }

  /**
   * Generate JSON report
   * @param {Array} results - Test results
   */
  generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'local',
      summary: this.calculateSummary(results),
      results: results,
    };

    const reportPath = path.join(this.outputDir, this.reportName);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 JSON report generated: ${reportPath}`);
  }

  /**
   * Calculate summary statistics
   * @param {Array} results - Test results
   * @returns {Object} Summary
   */
  calculateSummary(results) {
    const summary = {
      total: results.length,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      successRate: 0,
    };

    results.forEach(result => {
      summary[result.status]++;
      summary.duration += result.duration || 0;
    });

    summary.successRate = summary.total > 0 ? Math.round((summary.passed / summary.total) * 100) : 0;
    
    return summary;
  }
}

/**
 * Console Reporter
 */
export class ConsoleReporter {
  /**
   * Log test results to console
   * @param {Array} results - Test results
   */
  logResults(results) {
    console.log('\n🧪 Test Execution Summary');
    console.log('='.repeat(50));
    
    const stats = this.calculateStats(results);
    
    console.log(`✅ Passed: ${stats.passed}`);
    console.log(`❌ Failed: ${stats.failed}`);
    console.log(`⏭️  Skipped: ${stats.skipped}`);
    console.log(`📊 Total: ${stats.total}`);
    console.log(`⏱️  Duration: ${stats.duration}ms`);
    console.log(`🎯 Success Rate: ${stats.successRate}%`);
    
    if (stats.failed > 0) {
      console.log('\n❌ Failed Tests:');
      results.filter(r => r.status === 'failed').forEach(result => {
        console.log(`  - ${result.title}`);
      });
    }
    
    console.log('='.repeat(50));
  }

  /**
   * Calculate statistics
   * @param {Array} results - Test results
   * @returns {Object} Statistics
   */
  calculateStats(results) {
    const stats = {
      total: results.length,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
      successRate: 0,
    };

    results.forEach(result => {
      stats[result.status]++;
      stats.duration += result.duration || 0;
    });

    stats.successRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0;
    
    return stats;
  }
}

// Export default reporter
export const defaultReporter = new CustomHTMLReporter();
