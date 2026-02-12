import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { ticketsTable } from './schema';

const db_file_name = process.env.DB_FILE_NAME || 'file:local.db';
const db = drizzle(db_file_name);

const defaultTickets = [
  {
    title: 'Problema con acceso al sistema',
    description: 'No puedo acceder al sistema CRM. Me aparece error 401 al intentar iniciar sesión.',
    status: 'open',
    priority: 'high',
    requestor: 'Juan Pérez',
    department: 'Ventas',
    created_at: Date.now() - 86400000 * 2, 
    updated_at: Date.now() - 86400000 * 2
  },
  {
    title: 'Solicitud de nuevo software',
    description: 'Necesito licencia de Adobe Photoshop para el nuevo proyecto de marketing.',
    status: 'in_progress',
    priority: 'medium',
    requestor: 'María García',
    department: 'Marketing',
    created_at: Date.now() - 86400000 * 5,
    updated_at: Date.now() - 86400000 * 1
  },
  {
    title: 'Computadora lenta',
    description: 'Mi computadora está muy lenta desde la última actualización de Windows. Tarda mucho en abrir aplicaciones.',
    status: 'open',
    priority: 'low',
    requestor: 'Carlos Rodríguez',
    department: 'Recursos Humanos',
    created_at: Date.now() - 86400000 * 1,
    updated_at: Date.now() - 86400000 * 1
  },
  {
    title: 'Recuperación de archivos eliminados',
    description: 'Eliminé accidentalmente una carpeta importante del servidor compartido. Necesito recuperarla urgentemente.',
    status: 'in_progress',
    priority: 'urgent',
    requestor: 'Ana Martínez',
    department: 'Finanzas',
    created_at: Date.now() - 3600000 * 3,
    updated_at: Date.now() - 3600000 * 1 
  },
  {
    title: 'Configuración de correo en móvil',
    description: 'Ayuda para configurar el correo corporativo en mi nuevo iPhone.',
    status: 'resolved',
    priority: 'low',
    requestor: 'Luis González',
    department: 'Operaciones',
    created_at: Date.now() - 86400000 * 7,
    updated_at: Date.now() - 86400000 * 3 
  },
  {
    title: 'Impresora no funciona',
    description: 'La impresora del 3er piso no está imprimiendo. Aparece mensaje de error de conexión.',
    status: 'closed',
    priority: 'medium',
    requestor: 'Carmen López',
    department: 'Administración',
    created_at: Date.now() - 86400000 * 10,
    updated_at: Date.now() - 86400000 * 8
  },
  {
    title: 'Acceso a base de datos de producción',
    description: 'Necesito permisos de lectura en la base de datos de producción para generar reportes.',
    status: 'open',
    priority: 'medium',
    requestor: 'Roberto Silva',
    department: 'IT',
    created_at: Date.now() - 3600000 * 12,
    updated_at: Date.now() - 3600000 * 12
  },
  {
    title: 'VPN no conecta desde casa',
    description: 'No puedo conectarme a la VPN corporativa desde mi casa. El cliente VPN se queda en "Conectando...".',
    status: 'in_progress',
    priority: 'high',
    requestor: 'Patricia Ruiz',
    department: 'Desarrollo',
    created_at: Date.now() - 86400000 * 1,
    updated_at: Date.now() - 3600000 * 6
  }
];

async function seed() {
  try {
    console.log('Creando tickets');
    
    await db.insert(ticketsTable).values(defaultTickets);
    
    console.log('Se crearon', defaultTickets.length, ' tickets');
    console.log('\nTickets creadso:');
    defaultTickets.forEach((ticket, index) => {
      console.log(`  ${index + 1}. ${ticket.title} [${ticket.status}] [${ticket.priority}]`);
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed();
