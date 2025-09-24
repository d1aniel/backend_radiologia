import express, { Application } from "express";
import morgan from "morgan";
import { sequelize } from "../database/db";

// Load environment variables from the .env file

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.dbConnection(); // Call the database connection method

  }

  // Application settings
  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

 // Middleware configuration
 private middlewares(): void {
  this.app.use(morgan('dev'));
  this.app.use(express.json()); // leer json raw
  this.app.use(express.urlencoded({ extended: false })); //leer json form
}


// Method to connect and synchronize the database
private async dbConnection(): Promise<void> {
  try {
    await sequelize.sync({ force: true }); // Synchronize the database
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Start the server
  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
  }
}
