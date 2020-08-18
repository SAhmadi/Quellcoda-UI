export let defaultGradleProject = {
  children: [
    {
      id: 1,
      path: '',
      name: 'build-JITPACK.gradle',
      model: {
        value: 'plugins {\n' +
                '\tid \'java\'\n' +
                '}\n' +
                '\n' +
                'ext.jitpackGroup = \'com.github.junit-team.junit5\'\n' +
                'ext.jitpackVersion = \'master-SNAPSHOT\'\n' +
                '// ext.jitpackVersion = \'experiments~parallel-execution-SNAPSHOT\'\n' +
                '\n' +
                'repositories {\n' +
                '\tmavenCentral()\n' +
                '\tmaven { url \'https://jitpack.io\' }\n' +
                '}\n' +
                '\n' +
                'dependencies {\n' +
                '\ttestImplementation("${jitpackGroup}:junit-jupiter:${jitpackVersion}")\n' +
                '}\n' +
                '\n' +
                'test {\n' +
                '\tuseJUnitPlatform()\n' +
                '\ttestLogging {\n' +
                '\t\tevents "passed", "skipped", "failed"\n' +
                '\t}\n' +
                '}',
        language: 'gradle',
      },
    },
    {
      id: 2,
      path: '',
      name: 'build-SNAPSHOT.gradle',
      model: {
        value: 'plugins {\n' +
                '\tid \'java\'\n' +
                '}\n' +
                '\n' +
                'repositories {\n' +
                '\tmavenCentral()\n' +
                '\tmaven { url \'https://oss.sonatype.org/content/repositories/snapshots\' }\n' +
                '}\n' +
                '\n' +
                'dependencies {\n' +
                '\ttestImplementation(\'org.junit.jupiter:junit-jupiter:5.6.0-SNAPSHOT\')\n' +
                '}\n' +
                '\n' +
                'test {\n' +
                '\tuseJUnitPlatform()\n' +
                '\ttestLogging {\n' +
                '\t\tevents "passed", "skipped", "failed"\n' +
                '\t}\n' +
                '}',
        language: 'gradle',
      },
    },
    {
      id: 3,
      path: '',
      name: 'build.gradle',
      model: {
        value: 'plugins {\n' +
                '\tid \'java\'\n' +
                '\tid \'application\'\n' +
                '\tid \'eclipse\' // optional (to generate Eclipse project files)\n' +
                '\tid \'idea\' // optional (to generate IntelliJ IDEA project files)\n' +
                '}\n' +
                '\n' +
                'mainClassName = "com.example.project.Main"\n' +
                '\n' +
                'repositories {\n' +
                '\tmavenCentral()\n' +
                '}\n' +
                '\n' +
                'dependencies {\n' +
                '\ttestImplementation(\'org.junit.jupiter:junit-jupiter:5.6.0\')\n' +
                '}\n' +
                '\n' +
                'test {\n' +
                '\tuseJUnitPlatform()\n' +
                '\ttestLogging {\n' +
                '\t\tevents "passed", "skipped", "failed"\n' +
                '\t}\n' +
                '}',
        language: 'gradle',
      },
    },
    {
      id: 4,
      path: '',
      name: 'src',
      children: [
        {
          id: 5,
          path: 'src/',
          name: 'main',
          children: [
            {
              id: 6,
              path: 'src/main/',
              name: 'java',
              children: [
                {
                  id: 7,
                  path: 'src/main/java/',
                  name: 'com',
                  children: [
                    {
                      id: 8,
                      path: 'src/main/java/com/',
                      name: 'example',
                      children: [
                        {
                          id: 9,
                          path: 'src/main/java/com/example/',
                          name: 'project',
                          children: [
                            {
                              id: 10,
                              path: 'src/main/java/com/example/project/',
                              name: 'Main.java',
                              model: {
                                value: 'package com.example.project;\n\n// This is your main file...',
                                language: 'java',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 11,
          path: 'src/',
          name: 'test',
          children: [
            {
              id: 12,
              path: 'src/test/',
              name: 'java',
              children: [
                {
                  id: 13,
                  path: 'src/test/java',
                  name: 'com',
                  children: [
                    {
                      id: 14,
                      path: 'src/test/java/com/',
                      name: 'example',
                      children: [
                        {
                          id: 15,
                          path: 'src/test/java/com/example/',
                          name: 'project',
                          children: [
                            {
                              id: 16,
                              path: 'src/test/java/com/example/project/',
                              name: 'MainTest.java',
                              model: {
                                value: 'package com.example.project;\n\n// This is your main test file...',
                                language: 'java',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};