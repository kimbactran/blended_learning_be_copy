import { ClassroomEntity } from '@modules/classroom/entities/classroom.entity';
import { define } from 'typeorm-seeding';

define(ClassroomEntity, (faker) => {
    const title = faker.name.title();
    const resources = `<h1>JSON <span class="color_h1">HTML</span></h1>
    <div class="w3-clear nextprev">
    <a class="w3-left w3-btn" href="js_json_php.asp">❮ Previous</a>
    <a class="w3-right w3-btn" href="js_json_jsonp.asp">Next ❯</a>
    </div>
    <hr>
    <p class="intro">JSON can very easily be translated into JavaScript.</p>
    <p class="intro">JavaScript can be used to make HTML in your web pages.</p>
    <hr>
    <h2>HTML Table</h2>
    
    <p>Make an HTML table with data received as JSON:</p>`;

    const classroom = new ClassroomEntity();

    classroom.title = title;
    classroom.resources = resources;

    return classroom;
});
