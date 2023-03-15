
describe('Testing', () => {

  it('should be able to login with the correct credentials', () => {
    cy.correctLogin('Admin','admin123')
  })
 
it('should render the correct url once login', () => {
  cy.correctLogin('Admin','admin123')
  cy.url().should('contain','/dashboard/index')
})

it('should render the title of the page', () => {
  cy.correctLogin('Admin','admin123')
  cy.title().should('contain','OrangeHRM')
})

it('should render the correct top short links', () => {
  cy.correctLogin('Admin','admin123')
  cy.fixture('links.json').then(lks => {
    cy.get(':nth-child(-n + 11) > .oxd-main-menu-item').each(($el,index) => {
      expect(lks[index]).to.equal($el.text())
    })
  })
})
 //************* Time at Work
 it('should display paragraph name', () => {
  cy.correctLogin('Admin','admin123')
  cy.get(' div:nth-child(1) > div > div.orangehrm-dashboard-widget-header > div > p').should('contain','Time at Work')
 }) 

 //*************** clock
 it('should render the clock icon', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-attendance-card-bar > .oxd-icon-button > .oxd-icon').should('exist').should('be.visible')
  })

 it('should render a time display', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-attendance-card-bar > .oxd-text')
  .should('contain', 'h')
  .should('contain', 'm')
  .should('contain', 'Today');
 }) 

  it('should render paragraph details', () => {
    cy.correctLogin('Admin','admin123')
    cy.get('.orangehrm-attendance-card-details')
  .invoke('text')
  .should('contain','Punched In:')
  })

  it('should render seven bars', () => {
    cy.correctLogin('Admin','admin123')
    cy.get('.emp-attendance-chart > canvas')
  .should('have.css', 'display', 'block')
  })

////////////////////////////////////////
it('should not be able to login with the incorrect credentials', () => {
  cy.correctLogin('Adman','admin888')
  cy.get('.oxd-alert-content > .oxd-text').should('contain','Invalid credentials')

  })
 //**************** Quick Launch
 it('should render six quick launch', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(-n + 6)').should('have.length', 6)
  
 })
 it('should display the parent and sons', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(1)').click()
  cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item').should('contain','Entitlements').click()

  cy.get('.oxd-dropdown-menu > :nth-child(-n + 3)').should('contain', 'Add Entitlements')
  .should('contain', 'Employee Entitlements')
  .should('contain', 'Add Entitlements')
 
 })
//******************* Time Sheets
 it('should log', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6)').click()

  cy.url().should('contain','/time/viewMyTimesheet')
  cy.get('.oxd-topbar-body-nav > ul > :nth-child(-n + 4)').should('have.length', 4).should('be.visible').should('contain','Timesheets').should('contain','Attendance').should('contain','Reports').should('contain','Project Info')
 })

 it('shoud render one module with a title', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6)').click()
  cy.get(' div.oxd-layout-container > div.oxd-layout-context > div > form').should('have.length', 1).should('contain','My Timesheet')
 })

 it('enter a new timesheet', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6)').click()
  cy.projct('ACME Ltd','Administration')
 })

 it.skip('shoud render the project name', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6)').click()

  cy.fixture('timeSheet.json').then(pname => {
    cy.get('.--freeze-left > span').each(($el, index) => {
      expect(pname.data.project.name).deep.equal($el.text())

    })
  })
 })

 it.skip('should log-off', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.oxd-userdropdown-tab').click()
  cy.findByText('Logout').click()
  cy.wait(8000)
  cy.url().should('contain','/auth/login')

 })
 it.skip('should render Project on My Timesheet', () => {
  cy.correctLogin('Admin','admin123')
  cy.get('.orangehrm-dashboard-widget-body > .oxd-grid-3 > :nth-child(6)').click()

  cy.fixture('timeSheet.json').then(pjc => {
    cy.get(' th.orangehrm-timesheet-table-header-cell.--freeze-left').each(($el, index) => {
      expect(pjc.data[0]).deep.equal($el.text())
    })
  })
   
 })
})

//Integration testing: test what is displayed(get endpoint and create a fixture for it) and their relationship with other modules.